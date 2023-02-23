import {Express, Request, Response} from "express";
import {
    HttpController,
    HttpControllerFunction,
    HttpHeaders,
    HttpMethod,
    HttpQuery,
    HttpRequest,
    HttpServer
} from "@/InterfaceAdapters/adapters/HttpServer";

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
            res.send(result.val);
        } else {
            res.send(result.val);
        }
    } catch (e) {
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
        return undefined;
    }

    stop(): Promise<void> {
        return undefined;
    }
}
