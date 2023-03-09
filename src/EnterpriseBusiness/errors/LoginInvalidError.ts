import TagError from "./TagError";

export default class LoginInvalidError extends TagError {

    tag = 'LoginInvalidError';

    constructor() {
        super(`Invalid Login`);
    }
}
