import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import HashService from "@/InterfaceAdapters/services/HashService";
import UserCreateUseCase from "@/AplicationBusiness/useCases/user/UserCreateUseCase";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import typeOrmFactory from "@/Main/factories/repositories/TypeOrmFactory";
import UserListUseCase from "@/AplicationBusiness/useCases/user/UserListUseCase";

export default function UserListUseCaseFactory(){
    const dataSource = typeOrmFactory();

    const userRepository = new UserRepository(dataSource.main.models.user);
    return new UserListUseCase(userRepository);
}
