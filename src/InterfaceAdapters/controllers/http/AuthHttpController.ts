import {Ok} from "ts-results";
import {ILoginUseCase} from "@/EnterpriseBusiness/useCases/auth/LoginUseCases";
import {Get, HttpController, HttpRequest, HttpResult, Post, Route} from "../../adapters/HttpServer";

@Route("/api/auth")
export default class AuthHttpController extends HttpController {
    loginUseCase: ILoginUseCase;

    constructor(loginUseCase: ILoginUseCase){
        super();
        console.log('aqui', loginUseCase);
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
