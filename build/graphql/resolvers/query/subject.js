var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SubjectModel = require('../../../models/subject');
module.exports = function (parent, data, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const { results } = yield SubjectModel.query(`
        SELECT 
            subject.name, 
            subject.description, 
            user.name as creatorName, 
            user.email as creatorEmail
        FROM subjects as subject 
        JOIN users as user 
        ON subject.creator_id = user.id`);
        return results.map(({ name, description, creatorName, creatorEmail }) => {
            return {
                name,
                description,
                creator: {
                    name: creatorName,
                    email: creatorEmail,
                }
            };
        });
    });
};
//# sourceMappingURL=subject.js.map