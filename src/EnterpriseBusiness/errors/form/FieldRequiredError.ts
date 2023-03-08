import FormFieldError from "@/EnterpriseBusiness/errors/form/FormFieldError";

export default class FieldRequiredError extends FormFieldError  {

    tag = 'FieldRequiredError';

    errors: Error[];

    constructor(field: string) {
        super(`Field Required: ${field}`);
    }
}
