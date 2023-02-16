import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import LoginInvalidError from "../../errors/LoginInvalidError";


export interface LoginUserForm {
    email: string
    password: string
}

export interface LoginUserResult {
    id: number,
    name: string
    email: string
    token: string
}

export type LoginUseCaseErrors = DatabaseError | LoginInvalidError;

export type ILoginUseCase = UseCase<LoginUserForm, LoginUserResult, LoginUseCaseErrors>;
