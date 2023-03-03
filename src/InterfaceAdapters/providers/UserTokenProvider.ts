import User from "@/EnterpriseBusiness/entities/user.entity";
import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import TokenService from "@/InterfaceAdapters/services/TokenService";
import DatabaseError from "@/EnterpriseBusiness/errors/DatabaseError";
import NotFoundError from "@/EnterpriseBusiness/errors/NotFoundError";
import {Err, Ok, Result} from "ts-results";
import IUserProvider from "@/AplicationBusiness/provider/UserResolverProvider";


export type IUserTokenResolverProvider = IUserProvider<string>;

export default class UserTokenResolverProvider implements IUserTokenResolverProvider {

    userRepository: UserRepository;

    tokenService: TokenService;

    constructor(userRepository: UserRepository, tokenService: TokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    async resolveUser(token: string): Promise<Result<User, NotFoundError>> {
        const resolveTokenRes = await this.tokenService.resolveLoginToken(token);
        if (resolveTokenRes.err) return resolveTokenRes;
        const loginToken = resolveTokenRes.unwrap();
        const userRes = await this.userRepository.findById(loginToken.id);
        if (userRes.err) return Err(new DatabaseError());
        return Ok(userRes.unwrap());
    }
}
