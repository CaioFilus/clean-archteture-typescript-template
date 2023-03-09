import TagError from "./TagError";

export default class InvalidPasswordError extends TagError {

    tag = 'InvalidPasswordError';

    constructor(motive: string) {
        super(`Invalid Password: ${ motive}`);
    }
}
