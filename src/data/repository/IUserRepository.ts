import {Result} from "ts-results";
import DatabaseError from "../../domain/errors/DatabaseError";
import User from "../../domain/entities/user.entity";
import NotFoundError from "../../domain/errors/NotFoundError";

export type CreateUserRepository = Omit<User, 'id'>
export type CreateAdminRepository = Omit<CreateUserRepository, 'type'>
export type CreateCooperatingRepository = Omit<CreateUserRepository, 'type'>
export type CreateAccountRepository = Omit<CreateUserRepository, 'type'>

export default interface IUserRepository {
    createAdmin(user: CreateAdminRepository): Promise<Result<User, DatabaseError>>;
    createCooperating(user: CreateCooperatingRepository): Promise<Result<User, DatabaseError>>;
    createAccounting(user: CreateAccountRepository):Promise <Result<User, DatabaseError>>;

    findByEmail(email: string): Promise<Result<User, NotFoundError | DatabaseError>>;
}
