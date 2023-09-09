import express, { Express, Request, Response } from "express";
import { account } from "./route/main";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("env") !== "development" ? app.set("trust proxy", 1) : null;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(account);

export default app;
