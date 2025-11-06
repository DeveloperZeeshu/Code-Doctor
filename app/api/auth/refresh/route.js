import { error, success } from "../../../../lib/response.js"
import { createAccessToken, findSessionBySessionId, findUserById, verifyJWTToken } from "../../../../services/auth.services.js"

export const GET = async (req) => {
    try {
        const refreshToken = req.cookies.get('refresh_token')?.value

        if (!refreshToken)
            return error('Token not found.', 404)

        const {sessionId} = await verifyJWTToken(refreshToken)

        if (!sessionId)
            return error('Something went wrong', 500)

        const session = await findSessionBySessionId(sessionId)

        if (!session)
            return error('Invalid session id.', 400)

        const user = await findUserById(session.userId)

        if (!user)
            return error('User not found', 404)

        const newAccessToken = await createAccessToken({
            id: user._id,
            name: user.name,
            email: user.email,
            sessionId: session._id
        })

        if (!newAccessToken)
            return error('Something went wrong.', 500)

        const res = success(200)

        const baseConfig = {
            httpOnly: true,
            secure: true,
            sateSite: 'strict',
            path: '/'
        }
        res.cookies.set('access_token', newAccessToken, {
            ...baseConfig,
            maxAge: 60 * 15
        })

        return res

    } catch (err) {
        console.log(err)
        return error('Internal server error.', 500)
    }
}



