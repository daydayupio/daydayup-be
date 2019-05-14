import { ApolloError } from "apollo-server-express"
import { SubjectModel } from "../../../models/subject"
import { TopicModel } from "../../../models/topic"

export async function mutation(
    parent,
    { title, description, subjectName },
    { user }
) {
    const { id: userId } = user
    const results = await SubjectModel.db.find({ name: subjectName })
    const subjectId = results[0].id
    const model = await TopicModel.db.insert({
        title,
        description,
        subject_id: subjectId,
        creator_id: userId,
    })
    return model.insertId
}
