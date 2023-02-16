import {Result} from "ts-results";

export type HttpOk = string | null | object;

export type HttpResult = Result<HttpOk, Error>;

export type HttpHeaders = {[key: string]: string};
export type HttpQuery = {[key: string]: string | undefined | HttpQuery | HttpQuery[]};
export type HttpMethod = 'POST' | 'GET' | 'PUT' | 'DELETE';

export interface HttpRequest<Body = unknown, Headers = HttpHeaders, Query =  HttpQuery> {
    body: Body,
    query: Query,
    headers: Headers,
    method: HttpMethod,
    url: string,
}

export interface HttpServer {
    start(): Promise<void>;
    stop(): Promise<void>;

    get(url: string, fn: (res: HttpRequest) => HttpResult);
    post(url: string, fn: (res: HttpRequest) => HttpResult);
    put(url: string, fn: (res: HttpRequest) => HttpResult);
    delete(url: string, fn: (res: HttpRequest) => HttpResult);
}
type HttpControllerFunction = (req: HttpRequest<unknown, HttpHeaders, HttpQuery>) => Promise<HttpResult>;

export class HttpController {
    baseUrl = '';

    httpServer: HttpServer;

    endpoints: { url: string, method: HttpMethod, fn: HttpControllerFunction }[] = [];

    constructor(httpServer: HttpServer) {
        this.httpServer = httpServer;
    }
}


function module(url) {
    return function (target: typeof HttpController) {
        // eslint-disable-next-line no-param-reassign
        target.prototype.baseUrl = url;
    }
}


export function get(url) {
    return function (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) {
        target.endpoints.push({url, method: 'GET', fn: descriptor.value})
        return descriptor;
    }
}

export function post(url) {
    return function (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) {
        // eslint-disable-next-line no-param-reassign
        target.endpoints = target.endpoints || [];

        console.log(target);
        target.endpoints.push({url, method: 'POST', fn: descriptor.value})
        console.log(target);
        return descriptor;
    }
}

export function put(url) {
    return function (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) {
        target.endpoints.push({url, method: 'PUT', fn: descriptor.value})
        return descriptor;
    }
}

export function del(url) {
    return function (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) {
        target.endpoints.push({url, method: 'DELETE', fn: descriptor.value})
        return descriptor;
    }
}



