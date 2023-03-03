import {Ok} from "ts-results";
import {ILoginUseCase} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import {HttpController, HttpRequest, HttpResult} from "@/InterfaceAdapters/controllers/http/HttpController";
import {Post, Route} from "@/InterfaceAdapters/adapters/HttpServer";

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
           id: user.id,
           name: user.name,
           email: user.email,
           token: user.token,
       });
   }

   @Post('/logout')
   async logout(req: HttpRequest): Promise<HttpResult> {
       const useCaseResult = await this.loginUseCase.execute(req.body as {email: string, password: string});
       if(useCaseResult.err) return useCaseResult;
       const user = useCaseResult.unwrap();
       return Ok({
           id: user.id,
           name: user.name,
           email: user.email,
           token: user.token
       });
   }
}
