var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const logger = require('../../../util/logger');
const jwt = require('../../../util/jwt');
const pw = require('../../../util/password');
const UserModel = require('../../../models/user');
const ERROR_CODE = require('../../../config/errorCode');
const { ApolloError } = require('apollo-server-express');
module.exports = function (parent, { name, password }, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield UserModel.validate({ name, password });
        if (!user) {
            throw new ApolloError(ERROR_CODE.INVALID_LOGIN.message, ERROR_CODE.INVALID_LOGIN.code);
        }
        const { id, name: userName } = user;
        const token = jwt.sign({ id, name: userName });
        yield UserModel.updateToken({ userId: id, token });
        return token;
    });
};
//# sourceMappingURL=login.js.map