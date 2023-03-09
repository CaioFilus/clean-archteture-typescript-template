import TagError from "./TagError";

export default class DatabaseError extends TagError {

    tag = 'DatabaseError';

    constructor(message?: string) {
        super(`Database Error:${message}`);
    }
}
