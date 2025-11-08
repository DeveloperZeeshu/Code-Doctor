import mongoose from "mongoose"
import conf from "../conf/conf.js"

const mongoUri = conf.mongoDbUri

if (!mongoUri) {
    throw new Error("MongoDb Uri isn't defined.")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

export const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(mongoUri, {
                bufferCommands: false
            })
            .then((mongoose) => mongoose)
    }

    try {
        cached.conn = await cached.promise
    } catch (err) {
        cached.promise = null
        throw err
    }

    return cached.conn
}
