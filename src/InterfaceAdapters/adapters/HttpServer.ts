import {HttpRequest, HttpResponse} from "../gateway/http/Http.types";

export default interface IHttpServerAdapter {
	 start(port: number): Promise<void>;
	 stop(): Promise<void>;
	 setOnRequest(fn: (req: HttpRequest) => Promise<HttpResponse>): void;
}


