import config from "@utils/config";
import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();
const PORT = config("app.port");

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(PORT, () => console.log(`Service is running at PORT: ${PORT}`));