import TagError from "./TagError";

export default class InvalidPasswordError extends Error implements TagError {

    tag = 'InvalidPasswordError';

    constructor(motive: string) {
        super(`Invalid Password: ${ motive}`);
    }
}
