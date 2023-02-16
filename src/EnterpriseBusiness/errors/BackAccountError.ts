import TagError from "./TagError";

export default class BackAccountError extends Error implements TagError {

    tag = 'BackAccountError';

    constructor() {
        super('Bank account error');
    }
}
