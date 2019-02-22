const {ApolloError} = require('apollo-server-express')
const SubjectModel = require('../../../models/subject')
const TopicModel = require('../../../models/topic')

module.exports = async function (parent, {title, description, subjectName}, {user}) {
    const { id: userId } = user
    var {results} = await SubjectModel.find({name: subjectName})
    const subjectId = results[0].id
    var {results} = await TopicModel.insert({title, description, subject_id: subjectId, creator_id: userId})
    return results.insertId
}