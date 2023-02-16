import {Err, Ok, Result} from "ts-results";
import IUserRepository, {
    CreateAccountRepository,
    CreateAdminRepository,
    CreateCooperatingRepository
} from "../../data/repository/IUserRepository";
import DatabaseError from "../../domain/errors/DatabaseError";
import User, {UserType} from "../../domain/entities/user.entity";
import NotFoundError from "../../domain/errors/NotFoundError";

export class UserRepository implements IUserRepository {
    private users: User[] = [{id: 1, email: 'email', type: UserType.Admin, name: 'name', password: 'password'}];

    createAccounting(user: CreateAccountRepository): Promise<Result<User, DatabaseError>> {
        const lastId = this.users[this.users.length - 1].id + 1;
        const newUser = {...user, id: lastId, type: UserType.Accounting};
        this.users.push(newUser);
        return Promise.resolve(Ok(newUser));
    }

    createAdmin(user: CreateAdminRepository): Promise<Result<User, DatabaseError>> {
        const lastId = this.users[this.users.length - 1].id + 1;
        const newUser = {...user, id: lastId, type: UserType.Accounting};
        this.users.push(newUser);
        return Promise.resolve(Ok(newUser));
    }

    createCooperating(user: CreateCooperatingRepository): Promise<Result<User, DatabaseError>> {
        const lastId = this.users[this.users.length - 1].id + 1;
        const newUser = {...user, id: lastId, type: UserType.Accounting};
        this.users.push(newUser);
        return Promise.resolve(Ok(newUser));
    }

    findByEmail(email: string): Promise<Result<User, NotFoundError | DatabaseError>> {
        const user = this.users.find((item) => item.email === email);
        if (user) return Promise.resolve(Ok(user));
        return Promise.resolve(Err(new NotFoundError('User not found')));
    }

}
