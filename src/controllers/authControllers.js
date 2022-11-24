import { usersCollection, sessionsCollection } from "../database/db.js";
import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";

export async function login(req, res) { }


export async function signUp(req, res) {

    // Front-end data
    const newUser = req.body;


    try {
        const user = await usersCollection.findOne({ email: newUser.email });

        //User already exists...
        if (user) {
            return res.status(409).send("User already exists!")
        }

        const hashPassword = bcrypt.hashSync(newUser.password, 10);
        await usersCollection.insertOne({ ...newUser, password: hashPassword });

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.status(500).send("Couldn't create user!");
    }
}