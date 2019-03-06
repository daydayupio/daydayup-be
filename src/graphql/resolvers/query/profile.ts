import { UserModel } from "../../../models/user"

export async function query(parent, data, context) {
    const user = context.user
    return user
}
