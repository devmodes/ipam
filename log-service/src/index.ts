import express, { type Express } from "express";
import cors from "cors";
import config from "@utils/config";
import { successMiddleware } from "@middlewares/success.middleware";
import { errorsMiddleware } from "@middlewares/errors.middleware";
import router from "./routes";

const PORT = config("app.port");

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

app.use(successMiddleware);
app.use(errorsMiddleware);

app.listen(PORT, () => console.log(`Log Service listening to PORT: ${PORT}`));