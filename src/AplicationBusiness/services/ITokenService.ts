import User from "@/EnterpriseBusiness/entities/user.entity";
import {Result} from "ts-results";
import TokenExpiredError from "@/EnterpriseBusiness/errors/token/TokenExpiredError";
import TokenInvalidError from "@/EnterpriseBusiness/errors/token/TokenInvalidError";

export interface LoginToken {
    id: number,
}

export default interface ITokenService {
    generateLoginToken(user: User): string;

    resolveLoginToken(token: string): Promise<Result<LoginToken, TokenExpiredError | TokenInvalidError>>;
}
