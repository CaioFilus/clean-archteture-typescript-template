import JwtAdapter from "@/Main/adapters/JwtAdapter";
import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import {LoginUseCase} from "@/AplicationBusiness/useCases/auth/LoginUserUseCase";
import HashService from "@/InterfaceAdapters/services/HashService";
import TokenService from "@/InterfaceAdapters/services/TokenService";
import UserCreateUseCase from "@/AplicationBusiness/useCases/user/UserCreateUseCase";

export default function UserCreateUseCaseFactory(){
    const hashService = new HashService();
    const tokenService = new TokenService(new JwtAdapter());
    const userRepository = new UserRepository();
    AuthManager
    return new UserCreateUseCase(userRepository);
}
