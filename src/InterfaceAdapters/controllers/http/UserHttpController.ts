import {Ok} from "ts-results";
import {CreateUserForm, IUserCreateUseCase} from "@/EnterpriseBusiness/useCases/user/UserCreateUseCases";
import {IAuthProvider} from "@/AplicationBusiness/provider/AuthContextProvider";
import {IUserListUseCase} from "@/EnterpriseBusiness/useCases/user/UserListUseCases";
import {HttpController} from "@/InterfaceAdapters/controllers/http/HttpController";
import {HttpRequest, HttpResult, HttpStatus} from "@/InterfaceAdapters/gateway/http/Http.types";
import {Get, Post, Route} from "@/InterfaceAdapters/gateway/http/HttpDecorators";

@Route("/api/user")
export default class UserHttpController extends HttpController {

    constructor(
        readonly authContextProvider: IAuthProvider<string>,
        readonly userCreateUseCase: IUserCreateUseCase,
        readonly userListUseCase: IUserListUseCase,

    ) {
        super();
    }

    @Post('/')
    async create(req: HttpRequest): Promise<HttpResult> {
        const body = req.body as CreateUserForm;
        const authContext = this.authContextProvider.createAuthContext(req.headers.authorization);
        const useCaseResult = await this.userCreateUseCase.execute(body , { auth: authContext });
        if(useCaseResult.err) return useCaseResult;
        const user = useCaseResult.unwrap();
        return Ok({
            status: HttpStatus.ok,
            body: {
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    }

    @Get('/')
    async list(req: HttpRequest): Promise<HttpResult> {
        const authContext = this.authContextProvider.createAuthContext(req.headers.authorization);
        const useCaseResult = await this.userListUseCase.execute(req.body as {id?: number}, { auth: authContext });
        if(useCaseResult.err) return useCaseResult;
        const user = useCaseResult.unwrap();
        console.log(user);
        return Ok({
            status: HttpStatus.ok,
            body: user
        });
    }
}
