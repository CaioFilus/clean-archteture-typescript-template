import {Express, Request, Response} from "express";
import {
    HttpController,
    HttpControllerFunction,
    HttpHeaders, HttpMethod, HttpQuery,
    HttpRequest
} from "@/InterfaceAdapters/controllers/http/HttpController";
import {HttpServer} from "@/InterfaceAdapters/adapters/HttpServer";
import {Result} from "ts-results";
import UnknownError from "@/EnterpriseBusiness/errors/UnknownError";


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

export default class ExpressAdapter implements HttpServer {
    private express: Express

    constructor(express: Express) {
        this.express = express;
    }

    registerController(controller: HttpController) {
        controller.endpoints.forEach(endpoint => {
            // eslint-disable-next-line no-console
            console.log(`Registering endpoint: ${endpoint.method} ${endpoint.url}`);
            // eslint-disable-next-line default-case
            switch (endpoint.method) {
                case HttpMethod.get:
                    this.express.get(
                        endpoint.url,
                        (req, res) => expressEndpointWrap(req, res, endpoint.fn, controller)
                    );
                    break;
                case HttpMethod.post:
                    this.express.post(
                        endpoint.url,
                        (req, res) => expressEndpointWrap(req, res, endpoint.fn, controller)
                    );
                    break;
                case HttpMethod.put:
                    this.express.put(
                        endpoint.url,
                        (req, res) => expressEndpointWrap(req, res, endpoint.fn, controller)
                    );
                    break;
                case HttpMethod.delete:
                    this.express.delete(
                        endpoint.url,
                        (req, res) => expressEndpointWrap(req, res, endpoint.fn, controller)
                    );
                    break;
            }
        });
    }

    start(): Promise<void> {
        this.express.listen(3000);
        console.log(`Http Server Started at Port: 3000`);
        return Promise.resolve()
    }

    stop(): Promise<void> {
        return Promise.resolve()
    }
}
