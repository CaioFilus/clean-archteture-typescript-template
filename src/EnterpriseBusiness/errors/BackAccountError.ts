import TagError from "./TagError";

export default class BackAccountError extends TagError {

    tag = 'BackAccountError';

    constructor() {
        super('Bank account error');
    }
}
