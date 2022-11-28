import { purchasesCollection, usersCollection } from "../database/db.js";

export function sendUserProducts(req, res) {
	const user = res.locals.user;

	res.status(200).send(user.cart);
}

export async function deleteItem(req, res) {
	const user = res.locals.user;
	const idx = res.locals.idx;

	user.cart.splice(idx, 1);

	try {
		await usersCollection.updateOne({ _id: user._id }, { $set: user });
	} catch (err) {
		return res.sendStatus(500);
	}
	res.sendStatus(200);
}

export async function completePurchase(req, res) {
	const user = res.locals.user;
	const pay = "pix";

	const purchaseItem = {
		user: user.name,
		email: user.email,
		products: user.cart,
		payMethod: pay,
	};

	user.cart = [];

	try {
		await purchasesCollection.insertOne(purchaseItem);
		await usersCollection.updateOne({ _id: user._id }, { $set: user });
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}

	res.sendStatus(200);
}
