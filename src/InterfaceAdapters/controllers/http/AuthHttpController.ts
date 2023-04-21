import {Ok} from "ts-results";
import {ILoginUseCase} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import {HttpController} from "@/InterfaceAdapters/controllers/http/HttpController";
import {HttpRequest, HttpResult, HttpStatus} from "@/InterfaceAdapters/gateway/http/Http.types";
import {Post, Route} from "@/InterfaceAdapters/gateway/http/HttpDecorators";

@Route("/api/auth")
export default class AuthHttpController extends HttpController {
    loginUseCase: ILoginUseCase;

    constructor(loginUseCase: ILoginUseCase){
        super();
        this.loginUseCase = loginUseCase;
    }

    @Post('/login')
    async login(req: HttpRequest): Promise<HttpResult> {
        const useCaseResult = await this.loginUseCase.execute(req.body as {email: string, password: string});
        if(useCaseResult.err) return useCaseResult;
        const user = useCaseResult.unwrap();
        return Ok({
            status: HttpStatus.ok,
            body: {
                id: user.id,
                name: user.name,
                email: user.email,
                token: user.token,
            }
        });
    }

    @Post('/logout')
    async logout(req: HttpRequest): Promise<HttpResult> {
        const useCaseResult = await this.loginUseCase.execute(req.body as {email: string, password: string});
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
}
