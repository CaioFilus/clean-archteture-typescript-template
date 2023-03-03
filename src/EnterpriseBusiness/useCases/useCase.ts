import {Result} from "ts-results";

type UseCase<Form = unknown, Res = unknown, Errors extends Error = Error, Context = undefined> =  Context extends undefined
    ? { execute(request: Form): Promise<Result<Res, Errors>>; }
    : { execute(request: Form, context: Context): Promise<Result<Res, Errors>>; };
export default UseCase;
