import {UserRepository} from "@/InterfaceAdapters/repository/UserRepository";
import UserHttpController from "@/InterfaceAdapters/controllers/http/UserHttpController";
import UserCreateUseCase from "@/AplicationBusiness/useCases/user/UserCreateUseCase";
import HashService from "@/InterfaceAdapters/services/HashService";

export default function createUserHttpController() {
    const userRepository = new UserRepository();
    const hashService = new HashService();
    const authManager = new AuthManager();
    const userCreateUseCase = new UserCreateUseCase(userRepository, hashService, authManager);

    return new UserHttpController(userCreateUseCase);
}
