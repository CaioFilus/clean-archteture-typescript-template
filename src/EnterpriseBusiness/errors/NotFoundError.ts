import TagError from "./TagError";

export default class NotFoundError extends Error implements TagError {

    tag = 'NotFoundError';

    constructor(whatIsNotFound: string) {
        super(`${ whatIsNotFound} Not Found`);
    }
}
