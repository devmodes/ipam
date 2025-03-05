import { Router } from "express";
import loggerRouter from "./logger.routes";

const router: Router = Router();

router.use("", loggerRouter);

export default router;