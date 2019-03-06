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
    const { id, name: userName } = user
    const token = jwt.sign({ id, name: userName })

    await UserModel.updateToken({ userId: id, token })

    return token
}
