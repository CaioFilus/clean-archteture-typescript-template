import HashService from "../../../InterfaceAdapters/services/HashService";
import TokenService from "../../../InterfaceAdapters/services/TokenService";
import {UserRepository} from "../../../InterfaceAdapters/repository/UserRepository";
import {LoginUseCase} from "../../../AplicationBusiness/useCases/auth/LoginUserUseCase";


export default function LoginUseCaseFactory(){
    const hashService = new HashService();
    const tokenService = new TokenService();
    const userRepository = new UserRepository();
    return new LoginUseCase(userRepository, hashService, tokenService);
}
