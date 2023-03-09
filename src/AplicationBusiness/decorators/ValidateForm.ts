import {ZodFirstPartySchemaTypes} from "zod/lib/types";
import {z} from "zod";
import FormError from "@/EnterpriseBusiness/errors/form/FormError";
import {Err, Result} from "ts-results";
import UseCase from "@/EnterpriseBusiness/useCases/useCase";


type Validator<Form> = {
    [key in keyof Form]: ZodFirstPartySchemaTypes;
}

type ValidateUseCase<Form = any, Res = any, Errors extends FormError = FormError> = UseCase<Form, Res, Errors>

export default function ValidateForm<Func extends (form: any, ...args: any[]) => any>(validator: Validator<Parameters<Func>[0]>) {
    const schema = z.object(validator);
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Func>) => {
        if(!descriptor.value) return;
        const originalMethod: Func = descriptor.value;

        // eslint-disable-next-line no-param-reassign, @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-param-reassign
        descriptor.value = function (form: Parameters<Func>[0], ...args: unknown[]): any {
            const result = schema.safeParse(form);
            if (!result.success) {
                const formatted = result.error.format();
                const errors = Object.entries(formatted).reduce((acc, [key, value]) => {

                    if(key !== '_errors'){
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        acc[key] = value._errors;
                    }
                    return acc;
                }, {});
                console.log(1111111111, errors, formatted);
                return Err(new FormError(errors));
            }
            return originalMethod.call(this, form, ...args);
        };
    }
}
