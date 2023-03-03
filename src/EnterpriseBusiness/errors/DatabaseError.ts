import TagError from "./TagError";

export default class DatabaseError extends Error implements TagError {

    tag = 'DatabaseError';

    constructor(message?: string) {
        super(`Database Error:${message}`);
    }
}
