import User from "../models/User.js"
import { dbConnect } from "../lib/dbConnect.js"
import argon2 from 'argon2'
import Session from "../models/Session.js"
import jwt from 'jsonwebtoken'
import conf from "../conf/conf.js"
import { ACCESS_TOKEN_EXPIRY, MILLISECOND_PER_SECOND, REFRESH_TOKEN_EXPIRY } from "../conf/constants.js"
import crypto from 'crypto'

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

export const createSession = async ({ userId, userAgent, ip, refreshToken, expiresAt }) => {
    try {
        await dbConnect()

        const hashedToken = crypto.createHash('sha256').update(refreshToken).digest('hex')

        const session = await Session.create({
            userId,
            userAgent,
            ip,
            refreshToken: hashedToken,
            expiresAt
        })

        if (!session) throw new Error('Error creating session.')

        return session
    } catch (err) {
        console.log('Error creating error:', err)
        throw err
    }
}

export const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex')
}

export const createAccessToken = async ({ sub, name, email }) => {
    try {
        return jwt.sign({
            sub,
            name,
            email,
        }, conf.jwtSecret, {
            expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECOND_PER_SECOND
        })
    } catch (err) {
        console.log('Error creating access token:', err)
        throw err
    }
}

export const createRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex')
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

export const findSessionByToken = async ({ refreshToken }) => {
    try {
        await dbConnect()
        const now = new Date()
        return await Session.findOne({
            refreshToken,
            valid: true,
            expiresAt: { $gt: now }
        })
    } catch (err) {
        console.log('Error finding session:', err)
        throw err
    }
}

export const inValidateSession = async (refreshToken) => {
    try {
        const updatedSession = Session.findOneAndUpdate({ refreshToken }, { $set: { valid: false } })

        if (!updatedSession)
            throw new Error('Error invalidating session.')

        return updatedSession
    } catch (err) {
        console.log('Error invalidating session:', err)
        throw err
    }
}
