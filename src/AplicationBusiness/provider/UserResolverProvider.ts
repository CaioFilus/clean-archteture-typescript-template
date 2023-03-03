import User from "@/EnterpriseBusiness/entities/user.entity";
import NotFoundError from "@/EnterpriseBusiness/errors/NotFoundError";
import {Result} from "ts-results";

export default interface IUserProvider<T = unknown> {
    resolveUser(userIdentifier: T): Promise<Result<User, NotFoundError>>;
}
