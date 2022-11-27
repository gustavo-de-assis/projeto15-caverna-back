import { usersCollection } from "../database/db.js";
import { productList } from "../products/products.js";

export function sendProducts(req, res) {
	res.status(201).send(productList);
}

export async function addProduct(req, res) {
	const user = res.locals.user;
	const product = res.locals.product;

	user.cart.push(product)

	// Add product to user cart (update usersCollection)
	try {
		await usersCollection.updateOne({ _id: user._id }, { $set: user });
	} catch (err) {
		res.sendStatus(500);
	}

	res.sendStatus(200);
}

export function removeProduct() {}
