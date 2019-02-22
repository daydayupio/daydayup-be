const TopicModel = require('../../../models/topic')

module.exports = async function (parent, {subjectName}, context) {
    const baseQuery = `
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
    `
    let whereCondition = `WHERE 1 = 1`
    if (subjectName) {
        whereCondition = `WHERE subject.name = '${subjectName}'`
    }
    const query = baseQuery + whereCondition
    const {results} = await TopicModel.query(query)
    return results.map(({id, title, description, views, votes, stars, opinions, createdAt, updatedAt, creatorName, creatorEmail, subjectName}) => {
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
    }) 
}