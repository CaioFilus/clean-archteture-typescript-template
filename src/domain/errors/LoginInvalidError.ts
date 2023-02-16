import TagError from "./TagError";

export default class LoginInvalidError extends Error implements TagError {

    tag = 'LoginInvalidError';

    constructor() {
        super(`Invalid Login`);
    }
}
