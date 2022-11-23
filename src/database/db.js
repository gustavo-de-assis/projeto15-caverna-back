import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config();

const mongoClient = MongoClient(process.env.MONGO_URI)

try {
    await mongoClient.connect()
    console.log('Connected to MongoDB server')
} catch (err) {
    console.log(err)
}

db = mongoClient.db('cavernaDB')

export const usersCollection = db.collection('users')
export const sessionsCollection = db.collection('sessions')
export const productsCollection = db.collection('products')