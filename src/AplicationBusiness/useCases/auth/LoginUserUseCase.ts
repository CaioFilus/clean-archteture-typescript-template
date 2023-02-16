import {Err, Ok} from "ts-results";
import IUserRepository from "../../repository/IUserRepository";
import IHashService from "../../services/IHashService";
import NotFoundError from "../../../EnterpriseBusiness/errors/NotFoundError";
import LoginInvalidError from "../../../EnterpriseBusiness/errors/LoginInvalidError";
import ITokenService from "../../services/ITokenService";
import {ILoginUseCase} from "../../../EnterpriseBusiness/useCases/auth/LoginUseCases";

export class LoginUseCase implements ILoginUseCase {

    userRepository: IUserRepository;

    hashService: IHashService;

    tokenService: ITokenService;

    constructor(
        userRepository: IUserRepository,
        hashService: IHashService,
        tokenService: ITokenService) {

        this.userRepository = userRepository;
        this.hashService = hashService;
        this.tokenService = tokenService;
    }

    async execute(form) {
        const createUserResult = await this.userRepository.findByEmail(form.email);

        if (createUserResult.err) {
            if(createUserResult.val instanceof NotFoundError) return Err(new LoginInvalidError());
            return createUserResult;
        }

        const user = createUserResult.unwrap();

        if(!this.hashService.compareSha256(form.password, user.password)) return Err(new LoginInvalidError());

        const token = this.tokenService.generateToken({ id: user.id });

        return Ok({id: user.id, name: user.name, email: user.email, token});
    }
}
