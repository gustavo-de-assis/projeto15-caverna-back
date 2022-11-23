import { Router } from "express";
import { login } from "../controllers/authControllers.js";


const authRouter = Router();

authRouter.use(retrieveUserFromToken)
authRouter.post("/login", login);

export default authRouter;
