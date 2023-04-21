import {Result} from "ts-results";
import TagError from "../../../EnterpriseBusiness/errors/TagError";

export type HttpHeaders = {
	[key: string]: string
};

export enum HttpStatus {
	ok = 200,
	created = 201,
	accepted = 202,
	noContent = 204,
	badRequest = 400,
	unauthorized = 401,
	forbidden = 403,
	notFound = 404,
	methodNotAllowed = 405,
	conflict = 409,
	internalServerError = 500,

}

export type HttpQuery = {[key: string]: string | undefined | HttpQuery | HttpQuery[]};

export type HttpResponse<Body = unknown, Headers = HttpHeaders, Status = HttpStatus> = {body?: Body, headers?: Headers, status: Status};

export type HttpResult = Result<HttpResponse, TagError>;

export enum HttpMethod {
	get = 'GET',
	post = 'POST',
	put = 'PUT',
	delete = 'DELETE',
	options = 'OPTIONS',
}

export interface HttpRequest<Body = unknown, Headers = HttpHeaders, Query =  HttpQuery> {
	body: Body,
	query: Query,
	headers: Headers,
	method: HttpMethod,
	url: string,
}

