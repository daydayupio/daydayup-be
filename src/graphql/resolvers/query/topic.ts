import { TopicModel } from "../../../models/topic"

export async function query(parent, { id }, context) {
    // 更新浏览数
    var { results } = await TopicModel.find({ id })
    const views = results[0].views + 1
    await TopicModel.update({ views }, { id })

    const query = `
        SELECT
            topic.id,
            topic.title,
            topic.description,
            topic.views,
            topic.votes,
            topic.stars,
            topic.opinions,
            topic.created_at as createdAt,
            topic.updated_at as updatedAt,
            user.name as creatorName,
            user.email as creatorEmail,
            subject.name as subjectName
        FROM topics as topic
        JOIN users as user ON topic.creator_id = user.id
        JOIN subjects as subject ON topic.subject_id = subject.id
        WHERE topic.id = ${id}
    `
    var { results } = await TopicModel.query(query)
    return results.map(
        ({
            id,
            title,
            description,
            views,
            votes,
            stars,
            opinions,
            createdAt,
            updatedAt,
            creatorName,
            creatorEmail,
            subjectName,
        }) => {
            return {
                id,
                title,
                description,
                views,
                votes,
                stars,
                opinions,
                createdAt,
                updatedAt,
                creator: {
                    name: creatorName,
                    email: creatorEmail,
                },
                subject: {
                    name: subjectName,
                },
            }
        }
    )[0]
}
