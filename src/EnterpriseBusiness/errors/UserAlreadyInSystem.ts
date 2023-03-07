import TagError from "./TagError";

export default class UserAlreadyInSystem extends Error implements TagError {

    tag = 'UserAlreadyInSystem';

    constructor(email: string) {
        super(`User Already Registered in system: ${email}`);
    }
}
