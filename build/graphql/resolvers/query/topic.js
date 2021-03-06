"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const topic_1 = require("../../../models/topic");
function query(parent, { id }, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // 更新浏览数
        const result = yield topic_1.TopicModel.db.findById(id);
        const views = result.views + 1;
        yield topic_1.TopicModel.db.update({ views }, { id });
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
    `;
        const results = yield topic_1.TopicModel.db.query(query);
        return results.map(({ id, title, description, views, votes, stars, opinions, created_at, updated_at, creatorName, creatorEmail, subjectName, }) => {
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
            };
        })[0];
    });
}
exports.query = query;
//# sourceMappingURL=topic.js.map