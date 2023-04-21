import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import HashService from "@/InterfaceAdapters/services/HashService";
import UserCreateUseCase from "@/AplicationBusiness/useCases/user/UserCreateUseCase";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import typeOrmFactory from "@/Main/factories/repositories/TypeOrmFactory";
import UserListUseCase from "@/AplicationBusiness/useCases/user/UserListUseCase";
import UserModelFactory from "@/Main/factories/repositories/models/UserModelFactory";

export default function UserListUseCaseFactory(){
    const userRepository = new UserRepository(UserModelFactory());
    return new UserListUseCase(userRepository);
}
