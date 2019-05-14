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
const subject_1 = require("../../../models/subject");
const topic_1 = require("../../../models/topic");
function mutation(parent, { title, description, subjectName }, { user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = user;
        const results = yield subject_1.SubjectModel.db.find({ name: subjectName });
        const subjectId = results[0].id;
        const model = yield topic_1.TopicModel.db.insert({
            title,
            description,
            subject_id: subjectId,
            creator_id: userId,
        });
        return model.insertId;
    });
}
exports.mutation = mutation;
//# sourceMappingURL=createTopic.js.map