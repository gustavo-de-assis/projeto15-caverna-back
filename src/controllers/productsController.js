import { productList } from "../products/products.js";

export function sendProducts(req, res){

	res.status(201).send(productList);

}