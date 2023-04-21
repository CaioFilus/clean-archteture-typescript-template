import {Result} from "ts-results";
import DatabaseError from "../../EnterpriseBusiness/errors/DatabaseError";
import NotFoundError from "../../EnterpriseBusiness/errors/NotFoundError";

export interface ObjectLiteral {
	[key: string]: any;
}

export interface Operation {
	name: 'In' | 'Equal' | 'Like' | 'LessThan' | 'LessThanOrEqual' | 'GreaterThan' | 'GreaterThanOrEqual' | 'Not' | 'IsNull';
	data: unknown;
}

export function In<T>(data: T[]): Operation {
	return {
		name: "In",
		data,
	};
}

export function IsNull(): Operation {
	return {
		name: "IsNull",
		data: undefined,
	};
}

export function Equal<T>(data: T): Operation {
	return {
		name: "Equal",
		data,
	};
}

export function Like<T>(data: T): Operation {
	return {
		name: "Like",
		data,
	};
}
export function LessThan<T>(data: T): Operation {
	return {
		name: "LessThan",
		data,
	};
}
export function LessThanOrEqual<T>(data: T): Operation {
	return {
		name: "LessThanOrEqual",
		data,
	};
}
export function GreaterThan<T>(data: T): Operation {
	return {
		name: "GreaterThan",
		data,
	};
}
export function GreaterThanOrEqual<T>(data: T): Operation {
	return {
		name: "GreaterThanOrEqual",
		data,
	};
}
export function Not<T>(data: T): Operation {
	return {
		name: "Not",
		data,
	};
}

// eslint-disable-next-line no-use-before-define
export type FindOptionsWhereProperty<Value> =  (Value | Operation | Where<Value>) | (Value | Operation | Where<Value>)[];

export type Where<Model> = {
	[P in keyof Model]?: FindOptionsWhereProperty<Model[P]>;
}

export type Select<Model> = (keyof Model)[];

export type Relations<Model> = Array<keyof{ [Key in keyof Model]: Model[Key] extends object ? Key : never; }>;

export type OrderValues = "ASC" | "DESC" | "asc" | "desc" | {
	direction?: "asc" | "desc" | "ASC" | "DESC";
	nulls?: "first" | "last" | "FIRST" | "LAST";
};

export type Order<Entity> = {
	[P in keyof Entity]?: OrderValues;
};

export type DeepPartial<T> = T | (T extends Array<infer U> ? DeepPartial<U>[] : T extends Map<infer K, infer V> ? Map<DeepPartial<K>, DeepPartial<V>> : T extends Set<infer M> ? Set<DeepPartial<M>> : T extends object ? {
	[K in keyof T]?: DeepPartial<T[K]>;
} : T);
const a: Order<{a: string}> = {
	a: "ASC",
}

export interface FindForm<Model> {
	select?: Select<Model>;
	where?: Where<Model> | Where<Model>[];
	order?: Order<Model>;
	relations?: Relations<Model>;
	skip?: number;
	limit?: number;
}

export interface FindOneForm<Model> {
	select?: Select<Model>;
	where?: Where<Model> | Where<Model>[];
	order?: Order<Model>;
	relations?: Relations<Model>;
}

export interface RepositoryModel<Model> {
	find(options: FindForm<Model> | undefined): Promise<Result<Model[], DatabaseError>>;
	findOne(options: FindOneForm<Model>): Promise<Result<Model | null, DatabaseError>>;
	create(model: DeepPartial<Model>): Promise<Result<Model, DatabaseError>>;
}
