import {Express, Request, Response} from "express";
import {
    HttpController,
    HttpControllerFunction,
    HttpHeaders,
    HttpMethod,
    HttpQuery,
    HttpRequest,
    HttpServer
} from "../../InterfaceAdapters/adapters/HttpServer";

async function expressEndpointWrap(req: Request, res : Response, fn: HttpControllerFunction){
    const wrapRes: HttpRequest = {
        url: req.url,
        body: req.body as unknown,
        headers: req.headers as HttpHeaders,
        method: req.method as HttpMethod,
        query: req.query as HttpQuery,
    }
    const result = await fn(wrapRes);
    if(result.err) {
        res.send(result.val);
    } else {
        res.send(result.val);
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
                    this.get(endpoint.url, endpoint.fn);
                    break;
                case HttpMethod.post:
                    this.post(endpoint.url, endpoint.fn);
                    break;
                case HttpMethod.put:
                    this.put(endpoint.url, endpoint.fn);
                    break;
                case HttpMethod.delete:
                    this.delete(endpoint.url, endpoint.fn);
                    break;
            }
        });
    }



    get(url: string, fn: HttpControllerFunction) {
        this.express.get(url, (req, res) => expressEndpointWrap(req, res, fn));
    }

    post(url: string, fn: HttpControllerFunction) {
        this.express.post(url, (req, res) => expressEndpointWrap(req, res, fn));
    }

    put(url: string, fn: HttpControllerFunction) {
        this.express.put(url, (req, res) => expressEndpointWrap(req, res, fn));
    }

    delete(url: string, fn: HttpControllerFunction) {
        this.express.delete(url, (req, res) => expressEndpointWrap(req, res, fn));
    }

    start(): Promise<void> {
        this.express.listen(3000);
        return undefined;
    }

    stop(): Promise<void> {
        return undefined;
    }
}
