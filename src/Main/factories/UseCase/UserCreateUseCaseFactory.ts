import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import HashService from "@/InterfaceAdapters/services/HashService";
import UserCreateUseCase from "@/AplicationBusiness/useCases/user/UserCreateUseCase";
import BcryptAdapter from "@/Main/adapters/BcryptAdapter";
import typeOrmFactory from "@/Main/factories/repositories/TypeOrmFactory";

export default function UserCreateUseCaseFactory(){
    const dataSource = typeOrmFactory();
    const hashService = new HashService(new BcryptAdapter());

    const userRepository = new UserRepository(dataSource.main.models.user);
    return new UserCreateUseCase(userRepository, hashService);
}
