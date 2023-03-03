import "reflect-metadata";
import {HttpController, HttpControllerFunction, HttpMethod} from "@/InterfaceAdapters/controllers/http/HttpController";


export interface HttpServer {
    start(): Promise<void>;
    stop(): Promise<void>;
    registerController(controller: HttpController);
}

const FormatMetadataKey = Symbol("format");

export function Route(url) {
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

export function Get(url) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        endpoints.push({url, method: HttpMethod.get, fn: descriptor.value});
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        return descriptor;
    }
}

export function Post(url) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        endpoints.push({url, method: HttpMethod.post, fn: descriptor.value});
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        return descriptor;
    }
}

export function Put(url) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        endpoints.push({url, method: HttpMethod.put, fn: descriptor.value});
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        return descriptor;
    }
}

export function Delete(url) {
    return (target: HttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        const endpoints: HttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        endpoints.push({url, method: HttpMethod.delete, fn: descriptor.value});
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        return descriptor;
    }
}



