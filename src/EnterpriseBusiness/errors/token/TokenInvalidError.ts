import TagError from "../TagError";

export default class TokenInvalidError extends TagError {

    tag = 'TokenInvalidError';

    constructor(token: string) {
        super(`InvalidToken Error: ${token}`);
    }
}
