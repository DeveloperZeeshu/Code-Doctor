import { error, success } from "../../../../lib/response.js"
import { createAccessToken, findSessionByToken, findUserById, hashToken } from "../../../../services/auth.services.js"

export const GET = async (req) => {
    try {
        const refreshToken = req.cookies.get('refresh_token')?.value

        if (!refreshToken)
            return error('Token not found.', 404)

        const hashedToken = hashToken(refreshToken)
        const session = await findSessionByToken({ refreshToken: hashedToken })

        if (!session)
            return error('Invalid session.', 400)

        const user = await findUserById(session.userId)

        if (!user)
            return error('User not found', 404)

        const accessToken = await createAccessToken({
            sub: user._id,
            name: user.name,
            email: user.email,
        })

        if (!accessToken)
            return error('Something went wrong.', 500)

        return success({ accessToken, name: user.name, email: user.email }, '', 200)

    } catch (err) {
        console.log(err)
        return error('Internal server error.', 500)
    }
}



