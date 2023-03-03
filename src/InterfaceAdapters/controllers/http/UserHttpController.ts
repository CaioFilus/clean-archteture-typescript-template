import {Ok} from "ts-results";
import {CreateUserForm, IUserCreateUseCase} from "@/EnterpriseBusiness/useCases/user/UserCreateUseCases";
import {IAuthProvider} from "@/AplicationBusiness/provider/AuthContextProvider";
import {Post, Route} from "@/InterfaceAdapters/adapters/HttpServer";
import {HttpController, HttpRequest, HttpResult} from "@/InterfaceAdapters/controllers/http/HttpController";

@Route("/api/user")
export default class UserHttpController extends HttpController {

    constructor(
        readonly authContextProvider: IAuthProvider<string>,
        readonly createUserUseCase: IUserCreateUseCase
    ) {
        super();
    }

    @Post('/')
    async create(req: HttpRequest<CreateUserForm>): Promise<HttpResult> {

        const authContext = this.authContextProvider.createAuthContext(req.headers.authorization);
        const useCaseResult = await this.createUserUseCase.execute(req.body, { auth: authContext });
        if(useCaseResult.err) {
            const error = useCaseResult.val;
            return useCaseResult;
        }
        const user = useCaseResult.unwrap();
        return Ok({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }
}
