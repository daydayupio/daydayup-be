import { TopicModel } from "../../../models/topic"

export async function query(parent, { id }, context) {
    // 更新浏览数
    const result = await TopicModel.db.findById(id)
    const views = result.views + 1
    await TopicModel.db.update({ views }, { id })

    const query = `
        SELECT
            topic.id,
            topic.title,
            topic.description,
            topic.views,
            topic.votes,
            topic.stars,
            topic.opinions,
            topic.created_at,
            topic.updated_at,
            user.name as creatorName,
            user.email as creatorEmail,
            subject.name as subjectName
        FROM topics as topic
        JOIN users as user ON topic.creator_id = user.id
        JOIN subjects as subject ON topic.subject_id = subject.id
        WHERE topic.id = ${id}
    `
    const results = await TopicModel.db.query(query)
    return results.map(
        ({
            id,
            title,
            description,
            views,
            votes,
            stars,
            opinions,
            created_at,
            updated_at,
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
                createdAt: created_at,
                updatedAt: updated_at,
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
