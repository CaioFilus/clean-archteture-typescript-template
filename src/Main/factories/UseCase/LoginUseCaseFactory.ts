import JwtAdapter from "@/Main/adapters/JwtAdapter";
import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import {LoginUseCase} from "@/AplicationBusiness/useCases/auth/LoginUserUseCase";
import HashService from "@/InterfaceAdapters/services/HashService";
import TokenService from "@/InterfaceAdapters/services/TokenService";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import {ILoginUseCase} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import typeOrmFactory from "@/Main/factories/repositories/TypeOrmFactory";


export default function LoginUseCaseFactory(): ILoginUseCase {
    const dataSources = typeOrmFactory();
    const hashService = new HashService(new BcryptAdapter());
    const tokenService = new TokenService(new JwtAdapter());
    const userRepository = new UserRepository(dataSources.main.models.user);
    return new LoginUseCase(userRepository, hashService, tokenService);

}
