import JwtAdapter from "@/Main/adapters/JwtAdapter";
import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import {LoginUseCase} from "@/AplicationBusiness/useCases/auth/LoginUserUseCase";
import HashService from "@/InterfaceAdapters/services/HashService";
import TokenService from "@/InterfaceAdapters/services/TokenService";


export default function LoginUseCaseFactory(){
    const hashService = new HashService();
    const tokenService = new TokenService(new JwtAdapter());
    const userRepository = new UserRepository();
    return new LoginUseCase(userRepository, hashService, tokenService);
}
