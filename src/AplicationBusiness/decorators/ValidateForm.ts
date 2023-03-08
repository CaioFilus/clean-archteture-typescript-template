import {ZodFirstPartySchemaTypes} from "zod/lib/types";
import {z} from "zod";
import FormError from "@/EnterpriseBusiness/errors/form/FormError";
import {Err, Result} from "ts-results";
import UseCase from "@/EnterpriseBusiness/useCases/useCase";


type Validator<Form> = {
    [key in keyof Form]: ZodFirstPartySchemaTypes;
}

export default function ValidateForm<Form, Func extends (form: Form, ...args: any[]) => any>(validator: Validator<Form>) {
    const schema = z.object(validator);
    return (target: UseCase, propertyKey: string, descriptor: TypedPropertyDescriptor<Func>) => {
        if(!descriptor.value) return;
        const originalMethod: Func = descriptor.value;

        // eslint-disable-next-line no-param-reassign, @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        descriptor.value = function (form: Form, ...args: any[]): any {
            const result = schema.safeParse(form);
            if (!result.success) {
                const formatted = result.error.format();
                const errors = Object.entries(formatted).reduce((acc, [key, value]) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    acc[key] = value._errors;
                    return acc;
                }, {});

                return Err(new FormError(errors));
            }
            return originalMethod.call(this, form, ...args);
        };
    }
}
