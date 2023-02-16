import {Result} from "ts-results";

export default interface UseCase<Form = unknown, Res = unknown, Errors extends Error = Error> {
    execute(request: Form): Promise<Result<Res, Errors>>;
}
