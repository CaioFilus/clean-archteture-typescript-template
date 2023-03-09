import {Err, Ok, Result} from "ts-results";
import {
    CreateUserForm,
    CreateUserResult,
    IUserCreateUseCase, UserCreateUseCaseErrors, UserCreateUseCaseContext,
} from "@/EnterpriseBusiness/useCases/user/UserCreateUseCases";
import {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import IUserRepository from "@/AplicationBusiness/repository/IUserRepository";
import DatabaseError from "@/EnterpriseBusiness/errors/DatabaseError";
import NotFoundError from "@/EnterpriseBusiness/errors/NotFoundError";
import UserAlreadyInSystem from "@/EnterpriseBusiness/errors/UserAlreadyInSystem";
import {Auth} from "@/AplicationBusiness/decorators/Auth";
import ValidateForm from "@/AplicationBusiness/decorators/ValidateForm";
import validators from "@/AplicationBusiness/validators/Validators";
import IHashService from "../../services/IHashService";

export default class UserCreateUseCase implements IUserCreateUseCase {
    userRepository: IUserRepository;

    hashService: IHashService;

    constructor(userRepository: IUserRepository, hashService: IHashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }

    @Auth(UserType.Admin)
    async execute(form: CreateUserForm, context: UserCreateUseCaseContext): Promise<Result<CreateUserResult, UserCreateUseCaseErrors>> {

        const verifyIfEmailIsUsedResult = await this.verifyIfEmailIsUsed(form.email);
        if(verifyIfEmailIsUsedResult.err) return verifyIfEmailIsUsedResult;

        const hashedPassword = this.hashService.hashUserPassword(form.password);

        const createUserResult = await this.createUser({...form, password: hashedPassword});
        if(createUserResult.err) return createUserResult;

        const user = createUserResult.unwrap();

        return Ok({id: user.id, name: user.name, email: user.email});
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
