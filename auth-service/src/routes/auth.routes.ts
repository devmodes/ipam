import { me, refresh, signin, signout, signup } from "@controllers/auth.controller";
import { controller } from "@controllers/index";
import { auth } from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";
import { signinSchema } from "@schema/signinSchema";
import { signupSchema } from "@schema/signupSchema";
import { Router } from "express";

const router: Router = Router();

router.post("/signin", validate(signinSchema), controller(signin));
router.post("/signup", validate(signupSchema), controller(signup));
router.get("/me", auth, controller(me));
router.post("/signout", auth, controller(signout));
router.get("/refresh", controller(refresh));

export default router;
