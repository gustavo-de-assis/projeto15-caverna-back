import { Router } from "express";
import { addProduct, sendProducts } from "../controllers/productsController.js";
import { retrieveUserFromToken } from "../middlewares/global/retrieveUserFromToken.js";
import { productValidation } from "../middlewares/products/productValidation.js";

const prodRouter = Router();

prodRouter.get("/products", sendProducts);

prodRouter.use(retrieveUserFromToken);
prodRouter.put("/cart", productValidation, addProduct);

export default prodRouter;
