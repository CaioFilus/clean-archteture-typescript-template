import FormFieldError from "@/EnterpriseBusiness/errors/form/FormFieldError";
import TagError from "../TagError";

export default class EmailFieldError extends FormFieldError implements TagError {

    tag = 'EmailFieldError';

    constructor(field: string, actual: string) {
        super(`Invalid Email: ${field} = ${actual}`);
    }
}
