import TagError from "../TagError";

export default class TokenExpiredError extends TagError {

    tag = 'TokenExpiredError';

    constructor(token: string) {
        super(`TokenExpiredError ${token}`);
    }
}
