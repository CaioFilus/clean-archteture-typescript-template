import "reflect-metadata";
import {HttpMethod} from "@/InterfaceAdapters/gateway/http/Http.types";
import {HttpControllerFunction, IHttpController} from "@/InterfaceAdapters/gateway/http/HttpServer";

const FormatMetadataKey = Symbol("format");

export function Route(url: string) {
    return <T extends { new(...args: any[]): object }>(constructor: T) => {
        const endpoints: IHttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, constructor.prototype) || [];
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
    return (target: IHttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
        const endpoints: IHttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        if(descriptor.value){
            endpoints.push({url, method: HttpMethod.get, fn: descriptor.value});
            Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        }
        return descriptor;
    }
}

export function Post<T extends HttpControllerFunction>(url: string) {
    return (target: IHttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
        const endpoints: IHttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        if(descriptor.value){
            endpoints.push({url, method: HttpMethod.post, fn: descriptor.value});
            Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        }
        return descriptor;
    }
}

export function Put<T extends HttpControllerFunction>(url: string) {
    return (target: IHttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) => {
        const endpoints: IHttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        if(descriptor.value){
            endpoints.push({url, method: HttpMethod.put, fn: descriptor.value});
            Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        }
        return descriptor;
    }
}

export function Delete<T extends HttpControllerFunction>(url: string) {
    return (target: IHttpController, propertyKey: string, descriptor: TypedPropertyDescriptor<HttpControllerFunction>) => {
        const endpoints: IHttpController['endpoints'] = Reflect.getOwnMetadata(FormatMetadataKey, target) || [];
        Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        if(descriptor.value){
            endpoints.push({url, method: HttpMethod.delete, fn: descriptor.value});
            Reflect.defineMetadata(FormatMetadataKey, endpoints, target);
        }
        return descriptor;
    }
}
