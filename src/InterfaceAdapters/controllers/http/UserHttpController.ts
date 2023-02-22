import {Ok} from "ts-results";
import {HttpController, HttpRequest, HttpResult, Post, Route} from "@/InterfaceAdapters/adapters/HttpServer";
import {CreateUserForm, IUserCreateUseCase} from "@/EnterpriseBusiness/useCases/user/UserCreateUseCases";

@Route("/api/user")
export default class UserHttpController extends HttpController {

    constructor(readonly createUserUseCase: IUserCreateUseCase) {
        super();
    }

    @Post('/')
    async create(req: HttpRequest<CreateUserForm>): Promise<HttpResult> {
        const useCaseResult = await this.createUserUseCase.execute(req.body);
        if(useCaseResult.err) return useCaseResult;
        const user = useCaseResult.unwrap();
        return Ok({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }


}
