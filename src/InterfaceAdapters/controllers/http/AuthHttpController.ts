import {Ok} from "ts-results";
import {LoginUseCase} from "../../../AplicationBusiness/useCases/auth/LoginUserUseCase";
import {HttpController, HttpRequest, HttpResult, Post, Route} from "../../adapters/HttpServer";


@Route("/api/auth")
export default class AuthHttpController extends HttpController {
    loginUseCase: LoginUseCase;

    constructor(loginUseCase: LoginUseCase){
        super();
        this.loginUseCase = loginUseCase;
    }

   @Post('/auth/login')
   async login(req: HttpRequest): Promise<HttpResult> {
       const useCaseResult = await this.loginUseCase.execute(req.body);
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
