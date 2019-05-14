import { UserModel } from "../../../models/user"

export async function query(parent, data, context) {
    const results = await UserModel.db.findAll()
    return results
}
