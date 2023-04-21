import {Err, Ok, Result} from "ts-results";
import UserModel, {UserModelRole} from "@/InterfaceAdapters/repository/models/UserModel";
import IUserRepository, {
    CreateAccountRepository,
    CreateAdminRepository,
} from "../../AplicationBusiness/repository/IUserRepository";
import DatabaseError from "../../EnterpriseBusiness/errors/DatabaseError";
import User, {UserType} from "../../EnterpriseBusiness/entities/user.entity";
import NotFoundError from "../../EnterpriseBusiness/errors/NotFoundError";
import "dotenv/config";
import {FindOneForm, RepositoryModel} from "@/InterfaceAdapters/repository/RepositoryModel";

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

    constructor(readonly userModel: RepositoryModel<UserModel>) {
    }

    async createCustomer(user: CreateAccountRepository): Promise<Result<User, DatabaseError>> {
        const res = await this.userModel.create({...user, type: UserModelRole.Customer});
        if(res.err) return res;
        const userModel = res.val;
        return Ok({
            id: userModel.id,
            email: userModel.email,
            name: userModel.name,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        });
    }

    async createAdmin(user: CreateAdminRepository): Promise<Result<User, DatabaseError>> {
        const res = await this.userModel.create({...user, type: UserModelRole.Admin});
        if(res.err) return res;
        if(!res.val) return Err(new NotFoundError("User"));
        const userModel = res.val;
        return Ok({
            id: userModel.id,
            email: userModel.email,
            name: userModel.name,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        });
    }

    async createEmployee(user: CreateAdminRepository): Promise<Result<User, DatabaseError>> {
        const res = await this.userModel.create({...user, type: UserModelRole.Employee});
        if(res.err) return res;
        if(!res.val) return Err(new NotFoundError("User"));
        const userModel = res.val;
        return Ok({
            id: userModel.id,
            email: userModel.email,
            name: userModel.name,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        });

    }

    async findByEmail(email: string): Promise<Result<User, NotFoundError | DatabaseError>> {
        const res = await this.userModel.findOne({where: {email}});
        if(res.err) return res;
        if(!res.val) return Err(new NotFoundError("User"));
        const userModel = res.val;
        return Ok({
            id: userModel.id,
            email: userModel.email,
            name: userModel.name,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        });
    }

    async findById(id: number): Promise<Result<User, NotFoundError | DatabaseError>> {
        const res = await this.userModel.findOne({where: {id}});
        if(res.err) return res;
        if(!res.val) return Err(new NotFoundError("User"));
        const userModel = res.val;
        return Ok({
            id: userModel.id,
            email: userModel.email,
            name: userModel.name,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        });
    }

    async findAll(query: {id?: number}): Promise<Result<User[], DatabaseError>> {
        const where: FindOneForm<UserModel>['where'] = {};
        if(query.id) where.id = query.id;

        const res = await this.userModel.find({where});
        if(res.err) return res;
        const usersModel = res.val;
        return Ok(usersModel.map((userModel) => ({
            id: userModel.id,
            email: userModel.email,
            name: userModel.name,
            password: userModel.password,
            type: userModelTypeMapper[userModel.type],
        })));

    }

}
