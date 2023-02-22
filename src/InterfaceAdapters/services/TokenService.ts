import {Ok, Result} from "ts-results";
import TokenExpiredError from "@/EnterpriseBusiness/errors/token/TokenExpiredError";
import TokenInvalidError from "@/EnterpriseBusiness/errors/token/TokenInvalidError";
import ITokenService, {LoginToken} from "../../AplicationBusiness/services/ITokenService";

export interface ITokenAdapter {
    generateToken<T>(data: T): string;
    resolveJwt<T>(token: string): Result<T, TokenExpiredError | TokenInvalidError>;
}

export default class TokenService implements ITokenService {

    constructor(readonly tokenAdapter: ITokenAdapter) {}

    generateLoginToken(user: LoginToken): string {
        return this.tokenAdapter.generateToken({id: user.id});
    }

    async resolveLoginToken(token: string): Promise<Result<LoginToken, TokenExpiredError | TokenInvalidError>> {
        return this.tokenAdapter.resolveJwt(token);
    }
}
