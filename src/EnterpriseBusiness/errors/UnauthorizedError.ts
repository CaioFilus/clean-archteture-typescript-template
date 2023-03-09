import TagError from "./TagError";

export default class UnauthorizedError extends TagError {

    tag = 'UnauthorizedError';

    constructor(message?: string) {
        super(`UnauthorizedError: ${ message || ''}`);
    }
}
