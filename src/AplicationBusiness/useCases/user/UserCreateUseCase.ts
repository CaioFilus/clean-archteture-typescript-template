import {Err, Ok, Result} from "ts-results";
import IAuthService, {Auth} from "@/AplicationBusiness/services/IAuthService";
import {CreateUserForm, CreateUserResult, IUserCreateUseCase} from "@/EnterpriseBusiness/useCases/user/UserCreateUseCases";
import {UserType} from "@/EnterpriseBusiness/entities/user.entity";
import IUserRepository from "@/AplicationBusiness/repository/IUserRepository";
import DatabaseError from "@/EnterpriseBusiness/errors/DatabaseError";
import IHashService from "../../services/IHashService";
import InvalidEmailError from "../../../EnterpriseBusiness/errors/InvalidEmailError";
import InvalidPasswordError from "../../../EnterpriseBusiness/errors/InvalidPasswordError";

@Auth([UserType.Admin])
export default class UserCreateUseCase implements IUserCreateUseCase {
    userRepository: IUserRepository;

    hashService: IHashService;

    authManager: IAuthService;


    constructor(userRepository: IUserRepository, hashService: IHashService, authManager: IAuthService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
        this.authManager = authManager;
    }

    async execute(form: CreateUserForm): Promise<Result<CreateUserResult, DatabaseError>> {

        if(!this.isEmailValid(form.email)) return Err(new InvalidEmailError(form.email));
        if(form.password.length <= 6) return Err(new InvalidPasswordError('less than 6 characters'));

        const hashedPassword = this.hashService.sha256(form.password);

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

    private async createUser(request: CreateUserForm) {
        if(request.type === UserType.Admin) {
            return this.userRepository.createAdmin(request);
        } if(request.type === UserType.Accounting) {
            return this.userRepository.createAccounting(request);
        }
        return this.userRepository.createCooperating(request)
    }
}
