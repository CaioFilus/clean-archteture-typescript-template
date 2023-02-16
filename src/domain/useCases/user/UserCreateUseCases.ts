import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import LoginInvalidError from "../../errors/LoginInvalidError";
import {UserType} from "../../entities/user.entity";


export interface CreateUserForm {
    name: string
    type: UserType,
    email: string
    password: string
}

export interface CreateUserResult {
    id: number,
    name: string
    email: string
}

export type UserCreateUseCaseErrors = DatabaseError | LoginInvalidError;

export type IUserCreateUseCase = UseCase<CreateUserForm, CreateUserResult, UserCreateUseCaseErrors>;