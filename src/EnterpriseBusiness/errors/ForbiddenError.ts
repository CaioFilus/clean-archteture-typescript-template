import TagError from "./TagError";

export default class ForbiddenError extends TagError {

    tag = 'ForbiddenError';

    constructor(message?: string) {
        super(`ForbiddenError: ${ message}`);
    }
}
