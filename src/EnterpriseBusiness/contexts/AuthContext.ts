import User from "@/EnterpriseBusiness/entities/user.entity";
import {Result} from "ts-results";
import UnauthorizedError from "@/EnterpriseBusiness/errors/UnauthorizedError";
import ForbiddenError from "@/EnterpriseBusiness/errors/ForbiddenError";

export default interface AuthContext {
    getUser(): Promise<Result<User, UnauthorizedError>>;
    hasAuthorization(role: User['type'] | User['type'][]): Promise<Result<void, UnauthorizedError | ForbiddenError>>;
}
