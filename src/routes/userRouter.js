import { Router } from "express";
import { deleteItem, sendUserProducts } from "../controllers/userControllers.js";
import { retrieveUserFromToken } from "../middlewares/global/retrieveUserFromToken.js";
import { deleteRequestValidation } from '../middlewares/clients/deleteRequestValidation.js';

export const userRouter = Router()

userRouter.use(retrieveUserFromToken)
userRouter.get('/userCart', sendUserProducts)
userRouter.delete('/userCart/:idx', deleteRequestValidation, deleteItem)