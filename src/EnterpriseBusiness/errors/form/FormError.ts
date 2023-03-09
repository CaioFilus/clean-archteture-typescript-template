import TagError from "@/EnterpriseBusiness/errors/TagError";

export default class FormError extends TagError<{[key: string]: string[] }> {
    tag = 'FormError'

    constructor(formErrors: {[key: string]: string[] }) {
        super('Form Validation Error:');
        this.name = 'FormError';
        this.data = formErrors;
    }

    toString() {
        return String(this.data);
    }
}
