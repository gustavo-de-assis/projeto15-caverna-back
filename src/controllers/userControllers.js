import { usersCollection } from "../database/db.js";

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
