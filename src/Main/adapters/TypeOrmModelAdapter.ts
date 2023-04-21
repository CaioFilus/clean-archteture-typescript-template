import {
	In,
	Not,
	Equal,
	Like,
	LessThan,
	LessThanOrEqual,
	MoreThan,
	MoreThanOrEqual,
	IsNull,
	Repository, FindManyOptions, FindOptionsRelations
} from "typeorm";
import {FindOperator} from "typeorm/find-options/FindOperator";
import {ObjectLiteral} from "typeorm/common/ObjectLiteral";
import {FindOptionsOrder} from "typeorm/find-options/FindOptionsOrder";
import {Err, Ok, Result} from "ts-results";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import {
	DeepPartial, FindForm,
	FindOneForm, Operation, Relations,
	RepositoryModel,
	Where
} from "../../InterfaceAdapters/repository/RepositoryModel";
import DatabaseError from "../../EnterpriseBusiness/errors/DatabaseError";


const operationMap: Record<Operation['name'], (...args: any) => FindOperator<any>> = {
	Not,
	In,
	Equal,
	Like,
	LessThan,
	LessThanOrEqual,
	GreaterThan: MoreThan,
	GreaterThanOrEqual: MoreThanOrEqual,
	IsNull,
}

function isOperation(value: unknown): value is Operation {
	const v = value as Operation;
	return !!(v?.name && 'data' in v);
}

function operationConvert(operation: Operation): FindOperator<unknown> {
	const operator = operationMap[operation.name];
	if(isOperation(operation.data)) return operator(operationConvert(operation.data));
	return operator(operation.data);
}

function convertRelations<Model,T extends (keyof Model)[]>(relations: T): FindOptionsRelations<Model> {
	return  Object.fromEntries(relations.map(item => [item, true])) as FindOptionsRelations<Model>
}

function whereConverter<Model>(where: Where<Model>): FindOptionsWhere<Model> {
	const result: FindManyOptions<Model>['where'] = {};
	if(!where) return result;
	Object.entries(where).forEach(([k, v], i) => {
		const key = k as keyof Where<Model>;
		const value = v as Where<Model>[keyof Where<Model>];
		if (typeof value === 'object') {
			if(isOperation(value)) {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				result[key] = operationConvert(value) as FindOperator<Model[keyof Model]>;
			} else {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				result[key] = whereConverter(value);
			}
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			result[key] = value;
		}
	});
	return result;
}

export default class TypeOrmModelAdapter<Model extends ObjectLiteral> implements RepositoryModel<Model> {

	constructor(readonly model: Repository<Model>) {
	}

	async create(model: DeepPartial<Model>): Promise<Result<Model, DatabaseError>> {
		try {
			const entity = this.model.create(model);
			return Ok(await this.model.save(entity));
		} catch (e) {
			return Err(new DatabaseError(String(e)));
		}
	}

	async find(options: FindForm<Model> | undefined): Promise<Result<Model[], DatabaseError>> {
		let where: FindOptionsWhere<Model>[] | FindOptionsWhere<Model> = {}
		if(options?.where) where = Array.isArray(options.where) ? options.where.map(item => whereConverter(item)) : whereConverter(options.where);

		const query: FindManyOptions<Model> = options ? {
			where,
			select: options.select,
			order: options.order as FindOptionsOrder<Model>,
			relations: options.relations ? convertRelations<Model, Relations<Model>>(options.relations):undefined
		} : {};
		try {
			return Ok(await this.model.find(query));
		} catch (e) {
			return Err(new DatabaseError(String(e)));
		}
	}

	async findOne(options: FindOneForm<Model>): Promise<Result<Model | null, DatabaseError>> {
		let where: FindOptionsWhere<Model>[] | FindOptionsWhere<Model> = {}
		if(options?.where) where = Array.isArray(options.where) ? options.where.map(item => whereConverter(item)) : whereConverter(options.where);
		const query: FindManyOptions = {
			where,
			select: options.select,
			order: options.order as FindOptionsOrder<Model>,
			relations: options.relations ? convertRelations<Model, Relations<Model>>(options.relations): undefined,
			take: 1
		};
		try {
			const entity = await this.model.find(query);
			entity.filter(item => item);
			if(!entity[0]) return Ok(null);
			return Ok(entity[0]);
		} catch (e) {
			return Err(new DatabaseError(String(e)));
		}
	}
}
