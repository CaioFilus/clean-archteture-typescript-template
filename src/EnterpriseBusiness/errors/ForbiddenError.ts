import TagError from "./TagError";

export default class ForbiddenError extends Error implements TagError {

    tag = 'ForbiddenError';

    constructor(message?: string) {
        super(`ForbiddenError: ${ message}`);
    }
}
