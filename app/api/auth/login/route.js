import { error, success } from "../../../../lib/response.js"
import { createAccessToken, createRefreshToken, createSession, findUserByEmail, verifyPassword } from "../../../../services/auth.services.js"

export const POST = async (req) => {
    try {
        const { email, password } = await req.json()

        if (!email || !password)
            return error('Email and password required.', 400)

        const user = await findUserByEmail(email)

        if (!user)
            return error('User not found.', 404)

        const isPasswordValid = await verifyPassword({ hashedPassword: user.password, password })

        if (!isPasswordValid)
            return error('Password didn\'t match.', 401)

        // Extract user-agent and ip
        const userAgent = req.headers.get('user-agent') || 'unknown'
        const forwardedFor = req.headers.get('x-forwarded-for')
        const ip = forwardedFor?.split(',')[0]?.trim() || 'unknown'

        const session = await createSession({ userId: user._id, userAgent, ip })

        if (!session)
            return error('Unable to create session.', 500)

        const accessToken = await createAccessToken({ id: user._id, name: user.name, email: user.email, sessionId: session._id })

        const refreshToken = await createRefreshToken(session._id)

        if (!accessToken || !refreshToken)
            return error('Something went wrong.', 500)

        const res = success(200)

        const baseConfig = {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
        }
        res.cookies.set('access_token', accessToken, {
            ...baseConfig,
            maxAge: 60 * 15
        })

        res.cookies.set('refresh_token', refreshToken, {
            ...baseConfig,
            maxAge: 60 * 60 * 24 * 7
        })

        return res

    } catch (err) {
        console.log(err)
        return error('Internal server error.', 500)
    }
}


