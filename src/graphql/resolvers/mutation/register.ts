import { UserModel } from "../../../models/user"
import { AuthorizationModel } from "../../../models/authorization"
import * as jwt from "../../../util/jwt"
import * as pw from "../../../util/password"

export async function mutation(parent, { name, email, password }, context) {
    // judge repeat name
    var { results } = await UserModel.find({ name })
    if (results.length > 0) {
        throw new Error("username is invalid")
    }

    // insert record
    await UserModel.insert({
        name,
        email,
        password: pw.encrypt(password),
        role_code: "3",
    })

    const user = await UserModel.validate({ name, password })
    if (!user) {
        throw new Error("register error")
    }

    // login
    const token = jwt.sign({ id: user.id, name: user.name })

    // authorization
    AuthorizationModel.insert({ user_id: user.id, token })

    return token
}
