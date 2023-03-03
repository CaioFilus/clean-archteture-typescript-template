import {Result} from "ts-results";
import DatabaseError from "@/EnterpriseBusiness/errors/DatabaseError";
import NotFoundError from "@/EnterpriseBusiness/errors/NotFoundError";
import UnauthorizedError from "@/EnterpriseBusiness/errors/UnauthorizedError";
import ForbiddenError from "@/EnterpriseBusiness/errors/ForbiddenError";
import AuthContext from "@/EnterpriseBusiness/contexts/AuthContext";
import {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import UseCase from "../../EnterpriseBusiness/useCases/useCase";

interface AuthMeta {
    auth: AuthContext;
}

type AuthErrors = UnauthorizedError | ForbiddenError;

type AuthUseCase<Form = unknown, Res = unknown, Errors extends AuthErrors = AuthErrors> = UseCase<Form, Res, Errors, AuthMeta>

export function Auth(roles?: UserType | UserType[]) {
    return <P extends AuthUseCase, C extends { new(...args: unknown[]): P}, >(constructor: C) => {

        const prototype = (constructor.prototype) as P;
        const wrapFn = prototype.execute;

        prototype.execute = async function executeWrap (args: Parameters<P['execute']>[0], context: AuthMeta) {
            const {auth} = context;
            const userResult = await auth.getUser();
            if(userResult.err) return userResult;
            if(roles) {
                const hasAuthorizationResult = await auth.hasAuthorization(roles);
                if(hasAuthorizationResult.err) return hasAuthorizationResult;
            }
            return wrapFn.call(this, args);
        }
    }
}
