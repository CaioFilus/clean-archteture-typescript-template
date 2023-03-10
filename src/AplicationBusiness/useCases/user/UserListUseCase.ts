import {Err, Ok, Result} from "ts-results";
import IUserRepository from "@/AplicationBusiness/repository/IUserRepository";
import {Auth} from "@/AplicationBusiness/decorators/Auth";
import {
    IUserListUseCase,
    ListUserForm,
    ListUserResult, UserListUseCaseErrors, UserListUseCaseContext,
} from "@/EnterpriseBusiness/useCases/user/UserListUseCases";


export default class UserListUseCase implements IUserListUseCase {
    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    @Auth()
    async execute(request: ListUserForm, context: UserListUseCaseContext): Promise<Result<ListUserResult, UserListUseCaseErrors>> {
        const findAllUsersRes = await this.userRepository.findAll({id: request.id})
        if(findAllUsersRes.err) return findAllUsersRes as Err<UserListUseCaseErrors>;

        const users = findAllUsersRes.unwrap().map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
        }))

        return Ok(users);
    }


}
