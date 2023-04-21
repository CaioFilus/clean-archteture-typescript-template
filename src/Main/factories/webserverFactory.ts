import express from "express";
import {HttpServer} from "@/InterfaceAdapters/gateway/http/HttpServer";
import ExpressAdapter from "../adapters/ExpressAdapter";

const app = express()
app.use(express.json())

const expressAdapter = new ExpressAdapter(app);
const server = new HttpServer(expressAdapter);
export default server;
