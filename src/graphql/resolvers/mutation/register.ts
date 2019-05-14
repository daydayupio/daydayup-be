import { UserModel } from "../../../models/user"
import { AuthorizationModel } from "../../../models/authorization"
import * as jwt from "../../../util/jwt"
import * as pw from "../../../util/password"
import * as ERROR_CODE from "../../../config/errorCode"
import { ApolloError } from "apollo-server-core"

export async function mutation(parent, { name, email, password }, context) {
    // judge repeat name
    let results = await UserModel.db.find({ name })
    if (results.length > 0) {
        throw new ApolloError(
            ERROR_CODE.INVALID_USERNAME.message,
            ERROR_CODE.INVALID_USERNAME.code
        )
    }

    // insert record
    await UserModel.db.insert({
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
    AuthorizationModel.db.insert({ user_id: user.id, token })

    return token
}
