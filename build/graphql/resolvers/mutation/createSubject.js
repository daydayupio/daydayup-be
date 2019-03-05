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
module.exports = function (parent, { name, description }, { user }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id: userId } = user;
        const { results } = yield SubjectModel.find({ name });
        if (results.length > 0) {
            throw new ApolloError('已有重复主题', '');
        }
        yield SubjectModel.insert({ name, description, creator_id: userId });
        return name;
    });
};
//# sourceMappingURL=createSubject.js.map