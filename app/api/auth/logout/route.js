import { error, success } from "../../../../lib/response.js"
import { hashToken, inValidateSession } from "../../../../services/auth.services.js"

export const POST = async (req) => {
    try {
        const refreshToken = req.cookies.get('refresh_token')?.value
        if (!refreshToken)
            return error('Token not found.', 404)

        const hashedToken = hashToken(refreshToken)
        if (!hashedToken)
            return error('Something went wrong.', 500)

        const inValidatedSession = await inValidateSession(hashedToken)

        if (!inValidatedSession)
            return error('Something went wrong.', 500)

        const res = success(200)

        res.cookies.set('refresh_token', '', {
            maxAge: 0,
            path: '/'
        })

        return res
    } catch (err) {
        console.log(err)
        return error('Internal server error.', 500)
    }
}

