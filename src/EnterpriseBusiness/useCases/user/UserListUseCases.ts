import AuthContext from "@/EnterpriseBusiness/contexts/AuthContext";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import User, {UserType} from "../../entities/user.entity";


export interface ListUserForm {
    id?: number
}

export type ListUserResult = Omit<User, 'password'>[];

export type UserListUseCaseErrors = DatabaseError;

export type UserListUseCaseMeta = {
    auth: AuthContext,
};

export type IUserListUseCase = UseCase<ListUserForm, ListUserResult, UserListUseCaseErrors, UserListUseCaseMeta>;
