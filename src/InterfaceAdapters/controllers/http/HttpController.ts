// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {HttpControllerFunction, IHttpController} from "@/InterfaceAdapters/gateway/http/HttpServer";
import {HttpMethod, HttpResponse} from "@/InterfaceAdapters/gateway/http/Http.types";
import TagError from "@/EnterpriseBusiness/errors/TagError";
import UnknownError from "@/EnterpriseBusiness/errors/UnknownError";
import LoginInvalidError from "@/EnterpriseBusiness/errors/LoginInvalidError";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class HttpController implements IHttpController {
	baseUrl = '';

	endpoints: { url: string, method: HttpMethod, fn: HttpControllerFunction }[] = [];

	errorHandling(e: unknown): HttpResponse {
		const error = e instanceof TagError? e : new UnknownError(String(e));
		const code = error instanceof LoginInvalidError ? 401 : 500;
		return {body: {type: error.tag, data: error.data, message: error.message}, status: code};
	}
}
