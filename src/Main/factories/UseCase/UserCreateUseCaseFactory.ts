import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import HashService from "@/InterfaceAdapters/services/HashService";
import UserCreateUseCase from "@/AplicationBusiness/useCases/user/UserCreateUseCase";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import typeOrmFactory from "@/Main/factories/repositories/TypeOrmFactory";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";

export default function UserCreateUseCaseFactory(){
    const hashService = new HashService(new BcryptAdapter());
    const userRepository = new UserRepository(UserModelFactory());

    return new UserCreateUseCase(userRepository, hashService);
}
