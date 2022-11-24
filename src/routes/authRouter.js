import { Router } from "express";
import { login, signUp } from "../controllers/authControllers.js";
import { loginValidation } from "../middlewares/clients/loginValidation.js";

const authRouter = Router();

authRouter.post("/login", loginValidation, login);
authRouter.post("/signUp", signUp);

export default authRouter;
