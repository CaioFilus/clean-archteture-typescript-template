import {Result} from "ts-results";
import FormError from "@/EnterpriseBusiness/errors/form/FormError";

type UseCase<Form = unknown, Res = unknown, Errors extends Error = Error | FormError, Context = undefined> =  Context extends undefined
    ? { execute(form: Form): Promise<Result<Res, Errors>>; }
    : { execute(form: Form, context: Context): Promise<Result<Res, Errors>>; };
export default UseCase;
