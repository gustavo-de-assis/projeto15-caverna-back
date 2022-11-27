export function deleteRequestValidation(req, res, next) {
    const { idx } = req.params;
    const user = res.locals.user;

    if (!idx) {
        return res.sendStatus(404);
    }

    if (idx >= user.cart.length) {
        return res.sendStatus(404);
    }

    res.locals.idx = idx;

    next();
}
