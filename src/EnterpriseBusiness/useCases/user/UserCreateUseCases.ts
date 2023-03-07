import AuthContext from "@/EnterpriseBusiness/contexts/AuthContext";
import UseCase from "../useCase";
import DatabaseError from "../../errors/DatabaseError";
import LoginInvalidError from "../../errors/LoginInvalidError";
import {UserType} from "../../entities/user.entity";
import UserAlreadyInSystem from "@/EnterpriseBusiness/errors/UserAlreadyInSystem";


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

export type UserCreateUseCaseErrors = DatabaseError | LoginInvalidError | UserAlreadyInSystem;

export type UserCreateUseCaseMeta = {
    auth: AuthContext,
};

export type IUserCreateUseCase = UseCase<CreateUserForm, CreateUserResult, UserCreateUseCaseErrors, UserCreateUseCaseMeta>;
