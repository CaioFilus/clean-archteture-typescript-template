import FormFieldError from "@/EnterpriseBusiness/errors/form/FormFieldError";
import TagError from "../TagError";

export default class EmailFieldError extends FormFieldTagError {

    tag = 'EmailFieldError';

    constructor(field: string, actual: string) {
        super(`Invalid Email: ${field} = ${actual}`);
    }
}
