import {Err, Ok, Result} from "ts-results";
import {HttpHeaders, HttpMethod, HttpQuery, HttpRequest, HttpResult, HttpStatus, HttpResponse} from "./Http.types";
import IHttpServerAdapter from "../../adapters/HttpServer";
import TagError from "../../../EnterpriseBusiness/errors/TagError";


export interface HttpServerWatcher {
	onRequest(req: HttpRequest): Promise<HttpResponse>;
}
