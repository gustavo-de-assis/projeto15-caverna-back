import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function signUp(req, res) {
    // Front-end data
    const newUser = req.body;

    try {
        const user = await usersCollection.findOne({ email: newUser.email });

        //User already exists...
        if (user) {
            return res.status(409).send("User already exists!");
        }

        const hashPassword = bcrypt.hashSync(newUser.password, 10);
        await usersCollection.insertOne({ ...newUser, password: hashPassword });

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.status(500).send("Couldn't create user!");
    }
}

export async function login(req, res) {
    // Receive user information from middleware (that received the login info)
    // user = {name, email, cart, _id}
    const user = res.locals.user;

    // Create token for current session and the session itself
    const token = uuidV4();
    const userSession = { token, userId: user._id };
    
    // Check if session exists
    try {
        const existingSession = await sessionsCollection.findOne({
            userId: user._id,
        });

        if (!existingSession) {
            // Session does not exist => create one
            await sessionsCollection.insertOne(userSession);
        } else {
            // Session exists => delete it and create new one
            await sessionsCollection.deleteOne({ userId: user._id });
            await sessionsCollection.insertOne(userSession);
        }
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

    // Send user information (name, email, token, cart) to client (front-end)
    delete user._id;
    user.token = token;
    res.status(200).send(user);
}
