import * as jwt from "../../../util/jwt"
import { UserModel } from "../../../models/user"
import * as ERROR_CODE from "../../../config/errorCode"
import { ApolloError } from "apollo-server-express"

export async function mutation(parent, { name, password }, context) {
    const user = await UserModel.validate({ name, password })
    if (!user) {
        throw new ApolloError(
            ERROR_CODE.INVALID_LOGIN.message,
            ERROR_CODE.INVALID_LOGIN.code
        )
    }
    const token = jwt.sign({ id: user.id, name: user.name })

    await UserModel.updateToken({ user_id: user.id, token })

    return token
}
