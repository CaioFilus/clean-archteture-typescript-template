import {Err, Ok, Result} from "ts-results";
import {FindOptionsWhere} from "typeorm/find-options/FindOptionsWhere";
import UserModel, {UserModelRole} from "@/InterfaceAdapters/repository/models/UserModel";
import { Repository} from "typeorm";
import IUserRepository, {
    CreateAccountRepository,
    CreateAdminRepository,
} from "../../AplicationBusiness/repository/IUserRepository";
import DatabaseError from "../../EnterpriseBusiness/errors/DatabaseError";
import User, {UserType} from "../../EnterpriseBusiness/entities/user.entity";
import NotFoundError from "../../EnterpriseBusiness/errors/NotFoundError";
import "dotenv/config";

const userTypeMapper: Record<UserType, UserModelRole>= {
    [UserType.Admin]: UserModelRole.Admin,
    [UserType.Customer]: UserModelRole.Customer,
    [UserType.Employee]: UserModelRole.Employee,
}

const userModelTypeMapper: Record<UserModelRole, UserType>= {
    [UserModelRole.Admin]: UserType.Admin,
    [UserModelRole.Customer]: UserType.Customer,
    [UserModelRole.Employee]: UserType.Employee,
}

export class UserRepository implements IUserRepository {

    constructor(readonly userModel: Repository<UserModel>) {
    }

    async createCustomer(user: CreateAccountRepository): Promise<Result<User, DatabaseError>> {
        try {
            const res = await this.userModel.save({...user, type: UserModelRole.Customer});
            return Ok({
                id: res.id,
                email: res.email,
                name: res.name,
                password: res.password,
                type: userModelTypeMapper[res.type],
            });
        } catch (e) {
            return Err(new DatabaseError(e.message));
        }
    }

    async createAdmin(user: CreateAdminRepository): Promise<Result<User, DatabaseError>> {
        try {
            const res = await this.userModel.save({...user, type: UserModelRole.Admin});
            return Ok({
                id: res.id,
                email: res.email,
                name: res.name,
                password: res.password,
                type: userModelTypeMapper[res.type],
            });
        } catch (e) {
            return Err(new DatabaseError(e.message));
        }
    }

    async createEmployee(user: CreateAdminRepository): Promise<Result<User, DatabaseError>> {
        try {
            const res = await this.userModel.save({...user, type: UserModelRole.Employee});
            return Ok({
                id: res.id,
                email: res.email,
                name: res.name,
                password: res.password,
                type: userModelTypeMapper[res.type],
            });
        } catch (e) {
            return Err(new DatabaseError(e.message));
        }
    }

    async findByEmail(email: string): Promise<Result<User, NotFoundError | DatabaseError>> {
        try {
            const res = await this.userModel.findOne({where: {email}});
            if(!res) return Err(new NotFoundError("User not found"));
            return Ok({
                id: res.id,
                email: res.email,
                name: res.name,
                password: res.password,
                type: userModelTypeMapper[res.type],
            });
        } catch (e) {
            return Err(new DatabaseError(e.message));
        }
    }

    async findById(id: number): Promise<Result<User, NotFoundError | DatabaseError>> {
        try {
            const res = await this.userModel.findOne({where: {id}});
            if(!res) return Err(new NotFoundError("User not found"));
            return Ok({
                id: res.id,
                email: res.email,
                name: res.name,
                password: res.password,
                type: userModelTypeMapper[res.type],
            });
        } catch (e) {
            return Err(new DatabaseError(e.message));
        }
    }

    async findAll(query: {id?: number}): Promise<Result<User[], DatabaseError>> {
        try {
            const where: FindOptionsWhere<UserModel> = {};
            if(query.id) where.id = query.id;

            const res = await this.userModel.find({where});
            return Ok(res.map((user) => ({
                id: user.id,
                email: user.email,
                name: user.name,
                password: user.password,
                type: userModelTypeMapper[user.type],
            })));
        } catch (e) {
            return Err(new DatabaseError(e.message));
        }
    }

}
