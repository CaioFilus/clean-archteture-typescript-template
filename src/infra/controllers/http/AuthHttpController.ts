import {Ok} from "ts-results";
import {LoginUseCase} from "../../../data/useCases/auth/LoginUserUseCase";
import {HttpController, HttpRequest, HttpResult, post} from "./http";
import HashService from "../../services/HashService";
import TokenService from "../../services/TokenService";
import {UserRepository} from "../../repository/UserRepository";



export default class AuthHttpController extends HttpController {

   @post('/login')
   async login(req: HttpRequest): Promise<HttpResult> {
       const hashService = new HashService();
       const tokenService = new TokenService();
       const userRepository = new UserRepository();
       const loginUseCase = new LoginUseCase(userRepository, hashService, tokenService);

       const useCaseResult = await loginUseCase.execute(req.body);
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
