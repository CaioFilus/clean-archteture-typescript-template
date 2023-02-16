import {Result} from "ts-results";
import "reflect-metadata";

export type HttpOk = string | null | object;

export type HttpResult = Result<HttpOk, Error>;

export type HttpHeaders = {[key: string]: string};
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

export interface HttpServer {
    start(): Promise<void>;
    stop(): Promise<void>;
    registerController(controller: HttpController);
}

export class HttpController {
    baseUrl = '';

    httpServer: HttpServer;

    endpoints: { url: string, method: HttpMethod, fn: HttpControllerFunction }[] = [];
}

const FormatMetadataKey = Symbol("format");

export function Route(url) {
    return (constructor: new (...args: any) => HttpController) => {
        const endpoints = Reflect.getOwnMetadata(FormatMetadataKey, constructor.prototype);
        console.log('endpoints', endpoints);
        // eslint-disable-next-line no-param-reassign
        constructor.prototype.teste = "asdsada";
        Object.defineProperty(constructor, 'test5', {value: '213'} )
    }
}

export function Get(url) {
    return (target: new (...args: unknown[]) => object, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        Reflect.defineMetadata(FormatMetadataKey, {url, method: HttpMethod.get, fn: descriptor.value}, target);
        return descriptor;
    }
}

export function Post(url) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        endpoints.push({url, method: HttpMethod.post, fn: descriptor.value});
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target)
        // eslint-disable-next-line no-param-reassign
        if(!target.endpoints) target.endpoints = [];
        target.endpoints.push({url, method: HttpMethod.post, fn: descriptor.value})
        return descriptor;
    }
}

export function Put(url) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        target.endpoints.push({url, method: HttpMethod.put, fn: descriptor.value})
        return descriptor;
    }
}

export function Delete(url) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        target.endpoints.push({url, method: HttpMethod.delete, fn: descriptor.value})
        return descriptor;
    }
}



