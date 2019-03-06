import { ApolloError } from "apollo-server-express"
import { SubjectModel } from "../../../models/subject"

export async function mutation(parent, { name, description }, { user }) {
    const { id: userId } = user
    const { results } = await SubjectModel.find({ name })
    if (results.length > 0) {
        throw new ApolloError("已有重复主题", "")
    }
    await SubjectModel.insert({ name, description, creator_id: userId })
    return name
}
