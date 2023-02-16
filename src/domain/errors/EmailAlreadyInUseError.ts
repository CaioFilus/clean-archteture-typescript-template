import TagError from "./TagError";

export default class EmailAlreadyInUseError extends Error implements TagError {

    tag = 'EmailAlreadyInUseError';

    constructor() {
        super('Email already in use');
    }
}
