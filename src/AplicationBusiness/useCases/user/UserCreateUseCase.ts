import {Err, Ok, Result} from "ts-results";
import {
    CreateUserForm,
    CreateUserResult,
    IUserCreateUseCase, UserCreateUseCaseErrors,
} from "@/EnterpriseBusiness/useCases/user/UserCreateUseCases";
import {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import IUserRepository from "@/AplicationBusiness/repository/IUserRepository";
import DatabaseError from "@/EnterpriseBusiness/errors/DatabaseError";
import NotFoundError from "@/EnterpriseBusiness/errors/NotFoundError";
import UserAlreadyInSystem from "@/EnterpriseBusiness/errors/UserAlreadyInSystem";
import {Auth} from "@/AplicationBusiness/services/IAuthService";
import IHashService from "../../services/IHashService";
import InvalidEmailError from "../../../EnterpriseBusiness/errors/InvalidEmailError";
import InvalidPasswordError from "../../../EnterpriseBusiness/errors/InvalidPasswordError";

@Auth(UserType.Admin)
export default class UserCreateUseCase implements IUserCreateUseCase {
    userRepository: IUserRepository;

    hashService: IHashService;

    constructor(userRepository: IUserRepository, hashService: IHashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }

    async execute(form: CreateUserForm): Promise<Result<CreateUserResult, UserCreateUseCaseErrors>> {
        if(!this.isEmailValid(form.email)) return Err(new InvalidEmailError(form.email));
        if(form.password.length < 6) return Err(new InvalidPasswordError('less than 6 characters'));

        const verifyIfEmailIsUsedResult = await this.verifyIfEmailIsUsed(form.email);
        if(verifyIfEmailIsUsedResult.err) return verifyIfEmailIsUsedResult;

        const hashedPassword = this.hashService.hashUserPassword(form.password);

        const createUserResult = await this.createUser({...form, password: hashedPassword});
        if(createUserResult.err) return createUserResult;

        const user = createUserResult.unwrap();

        return Ok({id: user.id, name: user.name, email: user.email});
    }

    private isEmailValid(email: string): boolean {
        return !!String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    }

    private async verifyIfEmailIsUsed(email: string): Promise<Result<void, DatabaseError | UserAlreadyInSystem>> {
        const userWithSameEmail = await this.userRepository.findByEmail(email);
        if(userWithSameEmail.ok) return Err(new UserAlreadyInSystem(email));

        if(userWithSameEmail.val instanceof NotFoundError) return Ok(undefined);
        return userWithSameEmail as Err<DatabaseError>;
    }

    private async createUser(request: CreateUserForm) {
        if(request.type === UserType.Admin) {
            return this.userRepository.createAdmin(request);
        } if(request.type === UserType.Customer) {
            return this.userRepository.createCustomer(request);
        }
        return this.userRepository.createEmployee(request);
    }
}
