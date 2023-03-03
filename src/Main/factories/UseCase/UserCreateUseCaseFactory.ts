import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import HashService from "@/InterfaceAdapters/services/HashService";
import UserCreateUseCase from "@/AplicationBusiness/useCases/user/UserCreateUseCase";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";

export default function UserCreateUseCaseFactory(){
    const hashService = new HashService(new BcryptAdapter());
    const userRepository = new UserRepository();
    return new UserCreateUseCase(userRepository, hashService);
}
