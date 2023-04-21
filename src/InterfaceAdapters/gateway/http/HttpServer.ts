import "reflect-metadata";
import {Result} from "ts-results";
import {IncomingMessage, ServerResponse} from "http";
import IHttpServerAdapter from "@/InterfaceAdapters/adapters/HttpServer";
import TagError from "@/EnterpriseBusiness/errors/TagError";
import {HttpHeaders, HttpMethod, HttpQuery, HttpRequest, HttpResponse, HttpResult, HttpStatus} from "./Http.types";

export type HttpControllerFunction = (req: HttpRequest<unknown, HttpHeaders, HttpQuery>) => Promise<HttpResult>;

export interface IHttpController {
	cors?: {
		origin: string[] | "*",
		methods: HttpMethod[],
		allowedHeaders: string[],
	}
	baseUrl: string;
	endpoints: { url: string, method: HttpMethod, fn: HttpControllerFunction }[];
	errorHandling(e: unknown): HttpResponse;
	middleware?: (req: HttpRequest) => Promise<Result<unknown, TagError>>;
}

export class HttpServer {

	endpoints: { url: string, method: HttpMethod, fn: HttpControllerFunction, controller: IHttpController }[] = [];

	constructor(readonly httpServerAdapter: IHttpServerAdapter) {
		this.httpServerAdapter.setOnRequest(this.onRequest.bind(this));
	}

	start(port: number): Promise<void> {
		return this.httpServerAdapter.start(port).then(() => {
			console.log(`Server started on port ${port}`);
		});
	}

	stop(): Promise<void>{
		return this.httpServerAdapter.stop();
	}

	registerController(controller: IHttpController) {
		controller.endpoints.forEach(endpoint => {
			const url = endpoint.url.endsWith('/') ? endpoint.url.slice(0, -1) : endpoint.url
			console.log(`Registering ${endpoint.method} ${controller.baseUrl}${url}`)
			this.endpoints.push({
				url,
				method: endpoint.method,
				fn: endpoint.fn.bind(controller),
				controller,
			});
		});
	}

	corsHeaders(): HttpHeaders {
		return {
			'Access-Control-Allow-Origin':'*',
			'Access-Control-Allow-Methods':'GET, POST, PUT, DELETE, OPTIONS',
			'Access-Control-Allow-Headers':'Content-Type, Authorization',
		}
	}

	async onRequest(req: HttpRequest): Promise<HttpResponse>  {
		let url = req.url.split('?')[0];
		url = url.endsWith('/') ? url.slice(0, -1) : url

		console.log(`Request from ${req.method} ${url}`);
		const endpoints = this.endpoints.filter((end) => end.url === url);
		const endpoint = endpoints.find((item) => item.method === req.method);
		const res: HttpResponse = {
			status: HttpStatus.ok,
			body: {},
			headers: {
				'Content-Type': 'application/json',
				...this.corsHeaders(),
			}
		};

		// Cors-Support
		if(req.method === HttpMethod.options) return res;
		if (!endpoints.length) return {...res, status: HttpStatus.notFound}
		if (!endpoint) return {...res, status: HttpStatus.methodNotAllowed}

		try {
			const endpointFnRes = await endpoint.fn(req);
			if(endpointFnRes.err) {
				const errorHandling = endpoint.controller.errorHandling(endpointFnRes.val);
				console.log(`Error Response: ${endpointFnRes.val}`);
				res.body = errorHandling.body;
				res.status = errorHandling.status;
				res.headers = Object.assign(res.headers || {}, errorHandling.headers || {});
			} else {
				const response = endpointFnRes.unwrap();
				console.log(`Success Response:`, response);
				res.body = response.body;
				res.status = response.status;
				res.headers = Object.assign(res.headers || {}, response.headers || {});
			}
		} catch (e) {
			console.log(`Error Response: `, e);
			const errorHandling = endpoint.controller.errorHandling(e);
			res.body = errorHandling.body;
			res.status = errorHandling.status;
			res.headers = errorHandling.headers;
		}
		return res;
	}
}

