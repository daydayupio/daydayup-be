var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const TopicModel = require('../../../models/topic');
module.exports = function (parent, { subjectName }, context) {
    return __awaiter(this, void 0, void 0, function* () {
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
    `;
        let whereCondition = `WHERE 1 = 1`;
        if (subjectName) {
            whereCondition = `WHERE subject.name = '${subjectName}'`;
        }
        const query = baseQuery + whereCondition;
        const { results } = yield TopicModel.query(query);
        return results.map(({ id, title, description, views, votes, stars, opinions, createdAt, updatedAt, creatorName, creatorEmail, subjectName }) => {
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
            };
        });
    });
};
//# sourceMappingURL=topics.js.map