import authRouter from "./authRouter.js";
import { Router } from "express";
import prodRouter from "./prodRouter.js";

const router = Router();

router.use(authRouter);
router.use(prodRouter);

export default router;
