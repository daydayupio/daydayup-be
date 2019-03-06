import * as jwt from "../../../util/jwt"
import { UserModel } from "../../../models/user"
export async function mutation(parent, data, context) {
    if (!context.user) {
        throw new Error("not login")
    }

    const userId = context.user.id

    const condition = {}
    Object.entries(data).forEach(([key, val]) => {
        condition[key] =
            key === "password" ? UserModel.encryptPassword(val) : val
    })
    await UserModel.update(condition, { id: userId })
    const { results } = await UserModel.find({ id: userId })
    const user = results[0]
    context.user = { id: user.id, name: user.name }
    const token = jwt.sign({ id: user.id, name: user.name })
    await UserModel.updateToken({ userId: user.id, token })
    return token
}
