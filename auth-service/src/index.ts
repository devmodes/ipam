import config from "@utils/config";
import express, { type Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import { successMiddleware } from "@middlewares/success.middleware";
import { errorMiddleware } from "@middlewares/error.middleware";

const app: Express = express();
const PORT = config("app.port");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(router);

app.use(successMiddleware);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Service is running at PORT: ${PORT}`));