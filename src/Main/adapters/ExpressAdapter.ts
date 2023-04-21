import {Express, json, Request, Response} from "express";

import {Result} from "ts-results";
import UnknownError from "@/EnterpriseBusiness/errors/UnknownError";
import {HttpControllerFunction, HttpServer} from "@/InterfaceAdapters/gateway/http/HttpServer";
import {HttpController} from "@/InterfaceAdapters/controllers/http/HttpController";
import {
    HttpHeaders,
    HttpMethod,
    HttpQuery,
    HttpRequest,
    HttpResponse
} from "@/InterfaceAdapters/gateway/http/Http.types";
import {IncomingMessage, ServerResponse} from "http";
import IHttpServerAdapter from "@/InterfaceAdapters/adapters/HttpServer";


async function expressEndpointWrap(req: Request, res : Response, fn: HttpControllerFunction, controller: HttpController) {
    const wrapRes: HttpRequest = {
        url: req.url,
        body: req.body as unknown,
        headers: req.headers as HttpHeaders,
        method: req.method as HttpMethod,
        query: req.query as HttpQuery,
    }
    try {
        const result = await fn.call(controller, wrapRes);
        if (result.err) {
            res.statusCode = 500;
            res.send({type: result.val.tag, message: result.val.message, data: result.val.data});
        } else {
            res.statusCode = 500;
            res.send(result.val);
        }
    } catch (e) {
        res.statusCode = 500;
        if(e instanceof Error) {
            const error = new UnknownError(e.message);
            res.send({type: error.tag, message: error.message, data: error.data});
        } else {
            const error = new UnknownError(String(e));
            res.send({type: error.tag, message: error.message, data: error.data});
        }
    }
}

export default class ExpressAdapter implements IHttpServerAdapter {
    private express: Express

    constructor(express: Express) {
        this.express = express;
        express.use(json());
    }

    start(port: number): Promise<void> {
        this.express.listen(port)
        return Promise.resolve();
    }

    stop(): Promise<void> {
        return Promise.resolve()
    }

    setOnRequest(fn: (req: HttpRequest) => Promise<HttpResponse>): void {
        this.express.use(async (req: Request, res: Response) => {
            const response = await fn({
                url: req.url || '',
                body:  req.body,
                headers: req.headers as HttpHeaders,
                method: req.method as HttpMethod,
                query: req.query as HttpQuery,
            });
            res.status(response.status);
            Object.keys(response.headers || {}).forEach((key) => res.setHeader(key, response.headers![key]));
            res.send(response.body);
        });
    }
}
