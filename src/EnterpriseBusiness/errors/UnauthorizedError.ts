import TagError from "./TagError";

export default class UnauthorizedError extends Error implements TagError {

    tag = 'UnauthorizedError';

    constructor(message?: string) {
        super(`UnauthorizedError: ${ message || ''}`);
    }
}
