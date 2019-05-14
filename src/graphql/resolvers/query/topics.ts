import { TopicModel } from "../../../models/topic"

export async function query(parent, { subjectName }, context) {
    const baseQuery = `
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
    `
    let whereCondition = `WHERE 1 = 1`
    if (subjectName) {
        whereCondition = `WHERE subject.name = '${subjectName}'`
    }
    const query = baseQuery + whereCondition
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
    )
}
