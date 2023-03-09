import {Err, Ok, Result} from "ts-results";
import {
    ILoginUseCase,
    LoginUseCaseErrors,
    LoginUserForm,
    LoginUserResult
} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import validators from "@/AplicationBusiness/validators/Validators";
import ValidateForm from "@/AplicationBusiness/decorators/ValidateForm";
import IUserRepository from "../../repository/IUserRepository";
import IHashService from "../../services/IHashService";
import NotFoundError from "../../../EnterpriseBusiness/errors/NotFoundError";
import LoginInvalidError from "../../../EnterpriseBusiness/errors/LoginInvalidError";
import ITokenService from "../../services/ITokenService";

export class LoginUseCase implements ILoginUseCase {

    constructor(
        readonly userRepository: IUserRepository,
        readonly hashService: IHashService,
        readonly tokenService: ITokenService) {
    }

    @ValidateForm({
        email: validators.email(),
        password: validators.password(),
    })
    async execute(form: LoginUserForm): Promise<Result<LoginUserResult, LoginUseCaseErrors>> {

        const findUserRes = await this.userRepository.findByEmail(form.email);
        if (findUserRes.err) {
            if(findUserRes.val instanceof NotFoundError) return Err(new LoginInvalidError());
            return findUserRes;
        }

        const user = findUserRes.unwrap();
        if(!this.hashService.compareUserPassword(form.password, user.password)) return Err(new LoginInvalidError());

        const token = this.tokenService.generateLoginToken(user);

        return Ok({id: user.id, name: user.name, email: user.email, token});
    }
}
