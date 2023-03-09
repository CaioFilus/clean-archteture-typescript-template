import TagError from "./TagError";

export default class UnknownError extends TagError {

    tag = 'UnknownError';

    constructor(message: string) {
        super(`Unknown Error: ${message}`);
    }
}
