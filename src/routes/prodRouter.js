import { Router } from "express";
import { sendProducts } from "../controllers/productsController.js";
import { retrieveUserFromToken } from "../middlewares/global/retrieveUserFromToken.js";

const prodRouter = Router();

prodRouter.get("/products", sendProducts);


export default prodRouter;