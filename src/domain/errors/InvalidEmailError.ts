import TagError from "./TagError";

export default class InvalidEmailError extends Error implements TagError {

    tag = 'InvalidEmailError';

    constructor(email: string) {
        super(`Invalid Email :${ email}`);
    }
}
