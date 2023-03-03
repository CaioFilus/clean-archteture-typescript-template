import TagError from "../TagError";

export default class TokenInvalidError extends Error implements TagError {

    tag = 'TokenInvalidError';

    constructor(token: string) {
        super(`InvalidToken Error: ${token}`);
    }
}
