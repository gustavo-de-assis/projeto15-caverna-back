import { Router } from "express";
import { login, signUp } from "../controllers/authControllers.js";


const authRouter = Router();

authRouter.use(retrieveUserFromToken)
authRouter.post("/login", login);
authRouter.post("/signUp", signUp);

export default authRouter;
