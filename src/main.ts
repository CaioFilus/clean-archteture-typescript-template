import express from "express";
import ExpressAdapter from "./infra/adapters/ExpressAdapter";
import AuthHttpController from "./infra/controllers/http/AuthHttpController";
import {HttpController} from "./infra/controllers/http/http";

const app = express()
app.use(express.json())


const expressAdapter = new ExpressAdapter(app);
const authHttpController = new AuthHttpController(expressAdapter);

export default app;
