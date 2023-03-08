import FormFieldError from "@/EnterpriseBusiness/errors/form/FormFieldError";

export default class FieldTypeError extends FormFieldError  {

    tag = 'FieldTypeError';

    constructor(field: string, expectedType: string, actualType: string) {
        super(`Field type mismatch: ${field}, expected ${expectedType}, actual ${actualType}`);
    }
}
