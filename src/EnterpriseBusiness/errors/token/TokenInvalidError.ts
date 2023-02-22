import TagError from "../TagError";

export default class TokenInvalidError extends Error implements TagError {

    tag = 'TokenInvalidError';

    constructor(token: string) {
        super(`Database Error:${token}`);
    }
}
