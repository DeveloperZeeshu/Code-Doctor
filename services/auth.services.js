import User from "../models/User.js"
import { dbConnect } from "../lib/dbConnect.js"
import argon2 from 'argon2'
import Session from "../models/Session.js"
import jwt from 'jsonwebtoken'
import conf from "../conf/conf.js"

export const findUserByEmail = async (email) => {
    try {
        await dbConnect()
        return await User.findOne({ email })
    } catch (err) {
        console.log('Error finding user by email:', err)
        throw err
    }
}

export const findUserById = async (_id) => {
    try {
        await dbConnect()

        return await User.findOne({ _id })
    } catch (err) {
        console.log('Error find user:', err)
        throw err
    }
}

export const hashPassword = async (password) => {
    try {
        return await argon2.hash(password)
    } catch (err) {
        console.log('Error hashing password:', err)
        throw err
    }
}

export const verifyPassword = async ({ hashedPassword, password }) => {
    try {
        return await argon2.verify(hashedPassword, password)
    } catch (err) {
        console.log('Error verifying password:', err)
        throw err
    }
}

export const createUser = async ({ name, email, password }) => {
    try {
        await dbConnect()

        const newUser = await User.create({ name, email, password })

        if (!newUser) throw new Error('Error creating user.')

        return newUser
    } catch (err) {
        console.log('Error creating user:', err)
        throw err
    }
}

export const createSession = async ({ userId, userAgent, ip }) => {
    try {
        await dbConnect()

        const session = await Session.create({ userId, userAgent, ip })

        if (!session) throw new Error('Error creating session.')

        return session
    } catch (err) {
        console.log('Error creating error:', err)
        throw err
    }
}

export const createAccessToken = async ({ id, name, email, sessionId }) => {
    try {
        return jwt.sign({
            id,
            name,
            email,
            sessionId
        }, conf.jwtSecret, {
            expiresIn: '15m'
        })
    } catch (err) {
        console.log('Error creating access token:', err)
        throw err
    }
}

export const createRefreshToken = async (sessionId) => {
    try {
        return jwt.sign({
            sessionId
        }, conf.jwtSecret, {
            expiresIn: '7d'
        })
    } catch (err) {
        console.log('Error creating refresh token:', err)
        throw err
    }
}

export const verifyJWTToken = async (token) => {
    try {
        return jwt.verify(token, conf.jwtSecret)
    } catch (err) {
        console.log('Error verify Token:', err)
        throw err
    }
}

export const findSessionBySessionId = async (_id) => {
    try {
        await dbConnect()

        return await Session.findOne({ _id })
    } catch (err) {
        console.log('Error finding session:', err)
        throw err
    }
}
