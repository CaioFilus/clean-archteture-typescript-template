import ITokenService from "@/AplicationBusiness/services/ITokenService";
import IUserRepository from "@/AplicationBusiness/repository/IUserRepository";
import IAuthService from "@/AplicationBusiness/services/IAuthService";
import User, {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import {Ok, Result} from "ts-results";
import NotFoundError from "@/EnterpriseBusiness/errors/NotFoundError";
import TokenExpiredError from "@/EnterpriseBusiness/errors/token/TokenExpiredError";
import TokenInvalidError from "@/EnterpriseBusiness/errors/token/TokenInvalidError";


export default class AuthTokenService implements IAuthService {

    token: string;

    user: User | null;

    userRepository: IUserRepository;

    tokenService: ITokenService;

    constructor(
        token: string,
        userRepository: IUserRepository,
        tokenService: ITokenService) {
        this.token = token;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    async resolveToken(): Promise<Result<User, NotFoundError | TokenExpiredError | TokenInvalidError>> {
        const tokenRes = await this.tokenService.resolveLoginToken(this.token);
        if(tokenRes.err) return tokenRes;
        const token = tokenRes.unwrap();

        const userResult = await this.userRepository.findById(token.id);
        if (userResult.err) return userResult;
        this.user = userResult.unwrap();
        return Ok(this.user);
    }

    getUser(): User | null {
        return this.user;
    }

    hasAuthorization(roles: UserType | UserType[]): boolean {

        const {user} = this;
        if(!user) return false;
        if (Array.isArray(roles)) return roles.includes(user.type);
        return user.type === roles;
    }
}
