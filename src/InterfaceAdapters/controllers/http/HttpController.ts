import {Result} from "ts-results";

export type HttpOk = string | null | object;

export type HttpResult = Result<HttpOk, Error>;

export type HttpHeaders = {
    token?: string,
    [key: string]: string
};
export type HttpQuery = {[key: string]: string | undefined | HttpQuery | HttpQuery[]};
export enum HttpMethod {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    get = 'GET',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    post = 'POST',
    // eslint-disable-next-line @typescript-eslint/no-shadow
    put = 'PUT',
    delete = 'DELETE',
}

export interface HttpRequest<Body = unknown, Headers = HttpHeaders, Query =  HttpQuery> {
    body: Body,
    query: Query,
    headers: Headers,
    method: HttpMethod,
    url: string,
}

export type HttpControllerFunction = (req: HttpRequest<unknown, HttpHeaders, HttpQuery>) => Promise<HttpResult>;

export class HttpController {
    baseUrl = '';

    endpoints: { url: string, method: HttpMethod, fn: HttpControllerFunction }[] = [];
}
