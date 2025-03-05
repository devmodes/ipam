import { controller } from "@controllers/index";
import { addLog, getLogs } from "@controllers/logs.controller";
import { auth } from "@middlewares/auth.middleware";
import { policy } from "@middlewares/policy.middleware";
import { LogsPolicy } from "@policies/logs-policy";
import { Router } from "express";

const router: Router = Router();

router.post("/logs", controller(addLog));
router.get("/logs", [auth, policy(LogsPolicy.canView)], controller(getLogs));

export default router;