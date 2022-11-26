import { productSchema } from "../../models/productSchema.js";

export function productValidation(req, res, next) {
	const user = res.locals.user;
	const product = req.body;

	const validationErrors = productSchema.validate(product, {
		abortEarly: false,
	}).error;

	if (validationErrors) {
		const errors = validationErrors.details.map((e) => e.message);
		return res.status(400).send(errors);
	}

	// Delete product description: useless during checkout
	delete product.description;

    // Send product to later functions
    res.locals.product = product

	next();
}
