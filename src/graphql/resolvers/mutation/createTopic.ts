import { ApolloError } from "apollo-server-express"
import { SubjectModel } from "../../../models/subject"
import { TopicModel } from "../../../models/topic"

export async function mutation(
    parent,
    { title, description, subjectName },
    { user }
) {
    const { id: userId } = user
    var { results } = await SubjectModel.find({ name: subjectName })
    const subjectId = results[0].id
    var { results } = await TopicModel.insert({
        title,
        description,
        subject_id: subjectId,
        creator_id: userId,
    })
    return results.insertId
}
