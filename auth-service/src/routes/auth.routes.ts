import { Router } from "express";

const router: Router = Router();



router.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Testing"
  })
});

export default router;
