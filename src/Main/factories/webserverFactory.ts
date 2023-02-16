import express from "express";
import ExpressAdapter from "../adapters/ExpressAdapter";

const app = express()
app.use(express.json())

const expressAdapter = new ExpressAdapter(app);

export default expressAdapter;
