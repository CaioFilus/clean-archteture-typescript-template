import TagError from "@/EnterpriseBusiness/errors/TagError";

export default class FormError extends Error implements TagError {
    tag = 'FormError'

    errors: {[key: string]: string[] };

    constructor(formErrors: {[key: string]: string[] }) {
        super('Form Validation Error:');
        this.name = 'FormError';
        this.errors = formErrors;
    }

    toString() {
        return this.errors.toString();
    }

}
