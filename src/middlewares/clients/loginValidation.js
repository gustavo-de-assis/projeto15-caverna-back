import { usersCollection } from "../../database/db.js";
import { loginSchema } from "../../models/loginSchema.js";
import bcrypt from "bcrypt";

export async function loginValidation(req, res, next) {
    /**
    This function validates the login information sent by the front-end
    and passes on the logging user if they exist.
     */
    const loginInfo = req.body;
    let user;

    // Create possible validation errors
    const validationErrors = loginSchema.validate(loginInfo, {
        abortEarly: false,
    }).error;

    // Check for login validation errors and stop run if true
    if (validationErrors) {
        const errors = validationErrors.details.map((e) => {
            e.message;
        });
        return res.status(400).send(errors);
    }

    // Check if loginInfo corresponds to an entry on the usersCollection
    try {
        user = await usersCollection.findOne({ email: loginInfo?.email });

        // Check if the email sent is in the DB
        if (!user) {
            return res.sendStatus(404);
        }

        // Check if the password sent is the same in DB
        const passwordCheck = bcrypt.compareSync(
            loginInfo.password,
            user.password
        );

        if (!passwordCheck) {
            return res.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    // Send user to controller as {name, email, cart, _id}
    delete user.password;
    res.locals.user = user;
    next();
}
