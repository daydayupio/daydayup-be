var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const UserModel = require('../../../models/user');
const AuthorizationModel = require('../../../models/authorization');
const jwt = require('../../../util/jwt');
const pw = require('../../../util/password');
const logger = require('../../../util/logger');
module.exports = function (parent, { name, email, password }, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // judge repeat name
        var { results } = yield UserModel.find({ name });
        if (results.length > 0) {
            throw new Error('username is invalid');
        }
        // insert record
        yield UserModel.insert({ name, email, password: pw.encrypt(password), role_code: '3' });
        const user = yield UserModel.validate({ name, password });
        if (!user) {
            throw new Error('register error');
        }
        // login
        const token = jwt.sign({ id: user.id, name: user.name });
        // authorization
        AuthorizationModel.insert({ user_id: user.id, token });
        return token;
    });
};
//# sourceMappingURL=register.js.map