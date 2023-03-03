import User from "@/EnterpriseBusiness/entities/user.entity";
import {Err, Ok, Result} from "ts-results";
import UnauthorizedError from "@/EnterpriseBusiness/errors/UnauthorizedError";
import ForbiddenError from "@/EnterpriseBusiness/errors/ForbiddenError";
import AuthContext from "@/EnterpriseBusiness/contexts/AuthContext";
import IUserProvider from "@/AplicationBusiness/provider/UserResolverProvider";

export interface IAuthProvider<T = unknown> {
    createAuthContext(userIdentifier: T): AuthContext;
}

export default class AuthContextProvider<T = unknown> implements IAuthProvider {

    constructor(readonly userProvider: IUserProvider<T>) {
    }

    createAuthContext(userIdentifier: T): AuthContext {
        let user: User | undefined;
        const {userProvider} = this;
        return {
            async getUser(): Promise<Result<User, UnauthorizedError>> {
                if(!user) {
                    const userResolverResult = await userProvider.resolveUser(userIdentifier);
                    if(userResolverResult.err) return Err(new UnauthorizedError());
                    user = userResolverResult.unwrap();
                }
                return Ok(user);
            },
            async hasAuthorization(role: User["type"] | User["type"][]): Promise<Result<void, UnauthorizedError | ForbiddenError>> {
                if(!user) {
                    const userResolverResult = await userProvider.resolveUser(userIdentifier);
                    if(userResolverResult.err) return Err(new UnauthorizedError());
                    user = userResolverResult.unwrap();
                }
                if(Array.isArray(role)) {
                    if(role.includes(user.type)) return Ok(undefined);
                    return Err(new ForbiddenError());
                }
                if(user.type === role) return Ok(undefined);
                return Err(new ForbiddenError());
            }
        }
    }
}
