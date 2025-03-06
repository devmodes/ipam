import { controller } from "@controllers/index";
import {
  createIPAddress,
  deleteIPAddress,
  getIPAddress,
  getIPAddresses,
  updateIPAddress,
  updateIPAddressLabel,
} from "@controllers/ip.controller";
import { auth } from "@middlewares/auth.middleware";
import { policy } from "@middlewares/policy.middleware";
import { validate } from "@middlewares/validate.middleware";
import { createIPSchema } from "@schema/create-ip.schema";
import { updateLabelSchema } from "@schema/update-label.schema";
import { Router } from "express";
import { IPAddressPolicy } from "src/policies/ip-address.policy";

const router: Router = Router();

router.post(
  "/",
  [auth, policy(IPAddressPolicy.canCreate), validate(createIPSchema)],
  controller(createIPAddress)
);
router.get(
  "/",
  [auth, policy(IPAddressPolicy.canView)],
  controller(getIPAddresses)
);
router.get(
  "/:id",
  [auth, policy(IPAddressPolicy.canView)],
  controller(getIPAddress)
);

router.put("/:id", [auth, validate(createIPSchema)], controller(updateIPAddress));
router.put("/label/:id", [auth, validate(updateLabelSchema)], controller(updateIPAddressLabel));

router.delete(
  "/:id",
  [auth, policy(IPAddressPolicy.canDelete)],
  controller(deleteIPAddress)
);

export default router;
