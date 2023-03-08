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

export function Auth<Func extends (form: any, context: any, ...args: any) => any>(roles?: UserType | UserType[]) {
    return (target: UseCase, propertyKey: string, descriptor: TypedPropertyDescriptor<Func>) => {
        if(!descriptor.value) return;
        const wrapFn = descriptor.value;

        // eslint-disable-next-line no-param-reassign,@typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        descriptor.value = async function executeWrap (form: Parameters<Func>[0], context: AuthMeta, ...args: any) {
            const {auth} = context;
            const userResult = await auth.getUser();
            if(userResult.err) return userResult;
            if(roles) {
                const hasAuthorizationResult = await auth.hasAuthorization(roles);
                if(hasAuthorizationResult.err) return hasAuthorizationResult;
            }
            return wrapFn.call(this, form, context, ...args);
        }
    }
}
