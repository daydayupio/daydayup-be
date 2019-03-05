var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { ApolloError } = require('apollo-server-express');
const SubjectModel = require('../../../models/subject');
const TopicModel = require('../../../models/topic');
module.exports = function (parent, { title, description, subjectName }, { user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = user;
        var { results } = yield SubjectModel.find({ name: subjectName });
        const subjectId = results[0].id;
        var { results } = yield TopicModel.insert({ title, description, subject_id: subjectId, creator_id: userId });
        return results.insertId;
    });
};
//# sourceMappingURL=createTopic.js.map