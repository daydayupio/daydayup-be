var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require('jsonwebtoken');
const { ApolloError } = require('apollo-server-express');
const { salt } = require('../config/jwt');
const UserModel = require('../models/user');
const ERROR_CODE = require('../config/errorCode');
module.exports = class Auth {
    /**
     *
     * @param {object} payload
     * @param {string} payload.name
     * @param {string} payload.password
     */
    static login(payload) {
        return jwt.sign({ name: payload.name });
    }
    static getUserByAuthorization(authorization) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = authorization.split(' ')[1];
            return yield this.getUserByToken(token);
        });
    }
    static getUserByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!token) {
                return null;
            }
            let user;
            try {
                user = jwt.verify(token, salt);
            }
            catch (err) {
                throw new ApolloError(ERROR_CODE.SESSION_EXPIRED.message, ERROR_CODE.SESSION_EXPIRED.code);
            }
            if (!user) {
                return null;
            }
            const valid = yield UserModel.isTokenValid({ userId: user.id, token });
            if (!valid) {
                return null;
            }
            return user;
        });
    }
};
//# sourceMappingURL=auth.js.map