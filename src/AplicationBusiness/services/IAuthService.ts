import NotFoundError from "@/EnterpriseBusiness/errors/NotFoundError";
import {Result} from "ts-results";
import TokenExpiredError from "@/EnterpriseBusiness/errors/token/TokenExpiredError";
import TokenInvalidError from "@/EnterpriseBusiness/errors/token/TokenInvalidError";
import User, {UserType} from "../../EnterpriseBusiness/entities/user.entity";
import UseCase from "../../EnterpriseBusiness/useCases/useCase";

export default interface IAuthService {
    token: string,
    resolveToken(): Promise<Result<User, NotFoundError | TokenExpiredError | TokenInvalidError>>;
    getUser(): User | null;
    hasAuthorization(role: UserType | UserType[]): boolean;
}

export interface UseAuthManager {
    authManager: IAuthService
}

export function Auth(roles?: UserType | UserType[]) {
    return <P extends UseCase, C extends { new(...args: unknown[]): (P & UseAuthManager)}, >(constructor: C) => {

        const prototype = (constructor.prototype) as UseCase;
        const wrapFn = prototype.execute;

        prototype.execute = async function (...args: Parameters<P['execute']>) {
            const user = await this.authManager.getUser();
            if (!user) throw new Error('Unauthorized');
            if (roles && !this.authManager.hasAuthorization(roles)) throw new Error('Unauthorized');
            return wrapFn.call(this, args);
        }
    }
}
