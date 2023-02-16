import {Express, Request, Response} from "express";
import {HttpHeaders, HttpMethod, HttpQuery, HttpRequest, HttpResult, HttpServer} from "../controllers/http/http";

async function expressEndpointWrap(req: Request, res : Response, fn :(res: HttpRequest) => HttpResult){
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

    get(url: string, fn: (res: HttpRequest) => HttpResult) {
        this.express.get(url, (req, res) => expressEndpointWrap(req, res, fn));
    }

    post(url: string, fn: (res: HttpRequest) => HttpResult) {
        this.express.post(url, (req, res) => expressEndpointWrap(req, res, fn));
    }

    put(url: string, fn: (res: HttpRequest) => HttpResult) {
        this.express.put(url, (req, res) => expressEndpointWrap(req, res, fn));
    }

    delete(url: string, fn: (res: HttpRequest) => HttpResult) {
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
