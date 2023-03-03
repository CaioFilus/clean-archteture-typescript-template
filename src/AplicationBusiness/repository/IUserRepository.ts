import {Result} from "ts-results";
import DatabaseError from "../../EnterpriseBusiness/errors/DatabaseError";
import User from "../../EnterpriseBusiness/entities/user.entity";
import NotFoundError from "../../EnterpriseBusiness/errors/NotFoundError";

export type CreateUserRepository = Omit<User, 'id'>
export type CreateAdminRepository = Omit<CreateUserRepository, 'type'>
export type CreateCooperatingRepository = Omit<CreateUserRepository, 'type'>
export type CreateAccountRepository = Omit<CreateUserRepository, 'type'>

export default interface IUserRepository {
    createAdmin(user: CreateAdminRepository): Promise<Result<User, DatabaseError>>;
    createCustomer(user: CreateCooperatingRepository): Promise<Result<User, DatabaseError>>;
    createEmployee(user: CreateAccountRepository):Promise <Result<User, DatabaseError>>;

    findByEmail(email: string): Promise<Result<User, NotFoundError | DatabaseError>>;
    findById(id: number): Promise<Result<User, NotFoundError | DatabaseError>>;
}
