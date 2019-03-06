import { UserModel } from "../../../models/user"

export async function query(parent, data, context) {
    const { results } = await UserModel.findAll()
    return results
}
