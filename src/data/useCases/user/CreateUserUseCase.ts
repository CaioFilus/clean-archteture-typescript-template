import {Err, Ok, Result} from "ts-results";
import UseCase from "../../../domain/useCases/useCase";
import IUserRepository from "../../repository/IUserRepository";
import {UserType} from "../../../domain/entities/user.entity";
import DatabaseError from "../../../domain/errors/DatabaseError";
import IHashService from "../../services/IHashService";
import InvalidEmailError from "../../../domain/errors/InvalidEmailError";
import InvalidPasswordError from "../../../domain/errors/InvalidPasswordError";

export interface CreateUserForm {
    name: string
    type: UserType,
    email: string
    password: string
}

export interface CreateUserResult {
    id: number,
    name: string
    email: string
}

export class CreateUserUseCase implements UseCase {

    userRepository: IUserRepository;

    hashService: IHashService;

    constructor(userRepository: IUserRepository, hashService: IHashService) {
        this.userRepository = userRepository;
        this.hashService = hashService;
    }

    async execute(form: CreateUserForm): Promise<Result<CreateUserResult, DatabaseError>> {

        if(!this.isEmailValid(form.email)) return Err(new InvalidEmailError(form.email));
        if(form.password.length > 6) return Err(new InvalidPasswordError('less than 6 characters'));

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
