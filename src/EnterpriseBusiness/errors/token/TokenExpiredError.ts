import TagError from "../TagError";

export default class TokenExpiredError extends Error implements TagError {

    tag = 'TokenExpiredError';

    constructor(token: string) {
        super(`TokenExpiredError ${token}`);
    }
}
