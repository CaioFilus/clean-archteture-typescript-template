import TagError from "./TagError";

export default class EmailAlreadyInUseError extends TagError {

    tag = 'EmailAlreadyInUseError';

    constructor() {
        super('Email already in use');
    }
}
