import { usersCollection, sessionsCollection } from "../../database/db.js";

export async function retrieveUserFromToken(req, res, next) {
    /*
    This function receives the token as req.headers and returns the 
    user linked with the token's session if the session exists.
    */;

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    let user;

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const userSession = await sessionsCollection.findOne({ token: token });

        if (!userSession) {
            return res.sendStatus(404);
        }

        user = await usersCollection.findOne({ _id: userSession.userId });
    } catch (err) {
        console.log(err);
        return res.sendStatus(502);
    }

    delete user.password

    res.locals.user = user;

    next()
}
