import { SubjectModel } from "../../../models/subject"

export async function query(parent, data, context) {
    const { results } = await SubjectModel.query(`
        SELECT
            subject.name,
            subject.description,
            user.name as creatorName,
            user.email as creatorEmail
        FROM subjects as subject
        JOIN users as user
        ON subject.creator_id = user.id`)
    return results.map(({ name, description, creatorName, creatorEmail }) => {
        return {
            name,
            description,
            creator: {
                name: creatorName,
                email: creatorEmail,
            },
        }
    })
}
