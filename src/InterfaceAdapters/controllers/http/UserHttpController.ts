import {Ok} from "ts-results";
import {CreateUserForm, IUserCreateUseCase} from "@/EnterpriseBusiness/useCases/user/UserCreateUseCases";
import {IAuthProvider} from "@/AplicationBusiness/provider/AuthContextProvider";
import {Get, Post, Route} from "@/InterfaceAdapters/adapters/HttpServer";
import {HttpController, HttpRequest, HttpResult} from "@/InterfaceAdapters/controllers/http/HttpController";
import {IUserListUseCase} from "@/EnterpriseBusiness/useCases/user/UserListUseCases";

@Route("/api/user")
export default class UserHttpController extends HttpController {

    constructor(
        readonly authContextProvider: IAuthProvider<string>,
        readonly createUserUseCase: IUserCreateUseCase,
        readonly userListUseCase: IUserListUseCase,

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

    @Get('/')
    async list(req: HttpRequest<CreateUserForm>): Promise<HttpResult> {
        const authContext = this.authContextProvider.createAuthContext(req.headers.authorization);
        const useCaseResult = await this.userListUseCase.execute(req.body as {id?: number}, { auth: authContext });
        if(useCaseResult.err) return useCaseResult;
        const user = useCaseResult.unwrap();
        return Ok(user);
    }
}
