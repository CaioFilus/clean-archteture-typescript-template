import jwt from 'jsonwebtoken';
import {ITokenAdapter} from "@/InterfaceAdapters/services/TokenService";
import {Err, Ok, Result} from "ts-results";
import TokenExpiredError from "@/EnterpriseBusiness/errors/token/TokenExpiredError";
import TokenInvalidError from "@/EnterpriseBusiness/errors/token/TokenInvalidError";

export default class JwtAdapter implements ITokenAdapter {

    generateToken<T>(data: T): string {
        return jwt.sign(data as unknown as (string | object), "secret", {expiresIn: "1h"});
    }

    resolveJwt<T>(token: string): Result<T, TokenExpiredError | TokenInvalidError> {
        try {
            const decoded = jwt.verify(token, 'secret');
            return Ok(decoded as T);
        } catch (e) {
            if(e instanceof jwt.TokenExpiredError) return Err(new TokenExpiredError(token));
            if(e instanceof jwt.JsonWebTokenError) return Err(new TokenInvalidError(token));
            return Err(new TokenInvalidError(token));
        }
    }
}
