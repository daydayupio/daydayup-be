import * as jwt from "../../../util/jwt"
import { UserModel } from "../../../models/user"
import * as pw from "../../../util/password";
export async function mutation(parent, data, context) {
    if (!context.user) {
        throw new Error("not login")
    }

    const userId = context.user.id

    const condition = {}
    Object.entries(data).forEach(([key, val]) => {
        condition[key] =
            key === "password" ? pw.encrypt(val as string) : val
    })
    await UserModel.db.update(condition, { id: userId })
    const results = await UserModel.db.find({ id: userId })
    const user = results[0]
    context.user = { id: user.id, name: user.name }
    const token = jwt.sign({ id: user.id, name: user.name })
    await UserModel.updateToken({ user_id: user.id, token })
    return token
}
