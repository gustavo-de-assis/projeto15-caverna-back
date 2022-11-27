import authRouter from "./authRouter.js";
import { Router } from "express";
import prodRouter from "./prodRouter.js";
import { userRouter } from "./userRouter.js";

const router = Router();

router.use(authRouter);
router.use(prodRouter);
router.use(userRouter);

export default router;
