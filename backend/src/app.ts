import express, { Express, Request, Response } from "express";
import { account, admin, post, counselor } from "./route";
import "dotenv/config";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  const allowedOrigins = [process.env.ALLOWED_URL!];
  const origin = req.headers.origin;

  if (origin) {
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
  }
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return next();
});

app.get("env") !== "development" ? app.set("trust proxy", 1) : null;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use(account);
app.use(post);
app.use(admin);
app.use(counselor);

export default app;
