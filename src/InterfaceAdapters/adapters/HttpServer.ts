import "reflect-metadata";
import {
    HttpController,
    HttpControllerFunction, HttpHeaders,
    HttpMethod, HttpQuery,
    HttpRequest
} from "@/InterfaceAdapters/controllers/http/HttpController";


export interface HttpServer {
    start(): Promise<void>;
    stop(): Promise<void>;
    registerController(controller: HttpController): void;
}

const FormatMetadataKey = Symbol("format");

export function Route(url: string) {
    return <T extends { new(...args: any[]): object }>(constructor: T) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, constructor.prototype) || []
        const normalizedEndpoints = endpoints.map((endpoint) => ({
            ...endpoint,
            url: url + endpoint.url,
        }));
        return class extends constructor {
            baseUrl = url;

            endpoints = normalizedEndpoints;
        };
    }
}

export function Get<T extends HttpControllerFunction>(url: string) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        if(descriptor.value){
            endpoints.push({url, method: HttpMethod.get, fn: descriptor.value});
            Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        }
        return descriptor;
    }
}

export function Post<T extends HttpControllerFunction>(url: string) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        if(descriptor.value){
            endpoints.push({url, method: HttpMethod.post, fn: descriptor.value});
            Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        }
        return descriptor;
    }
}

export function Put<T extends HttpControllerFunction>(url: string) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        if(descriptor.value){
            endpoints.push({url, method: HttpMethod.put, fn: descriptor.value});
            Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        }
        return descriptor;
    }
}

export function Delete<T extends HttpControllerFunction>(url: string) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        if(descriptor.value){
            endpoints.push({url, method: HttpMethod.delete, fn: descriptor.value});
            Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        }
        return descriptor;
    }
}



