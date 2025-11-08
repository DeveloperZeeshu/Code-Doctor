import { createUser, findUserByEmail, hashPassword } from "../../../../services/auth.services.js"
import { error, success } from "../../../../lib/response.js"

export const POST = async (req) => {
    try {
        const { name, email, password } = await req.json()

        if (!name || !email || !password)
            return error('Name, email and password missing.', 400)

        const isUserExist = await findUserByEmail(email)

        if (isUserExist)
            return error('User with this email already exists.', 409)

        const hashedPassword = await hashPassword(password)

        if (!hashedPassword)
            return error('Something went wrong.', 500)

        const newUser = await createUser({ name, email, password: hashedPassword })

        if (!newUser)
            return error('Registration unsuccessful.', 500)

        return success(200)
    } catch (err) {
        console.log(err)
        return error('Internal server error.', 500)
    }
}



