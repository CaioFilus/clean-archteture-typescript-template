import TagError from "./TagError";

export default class NotFoundError extends TagError {

    tag = 'NotFoundError';

    constructor(whatIsNotFound: string) {
        super(`${ whatIsNotFound} Not Found`);
    }
}
