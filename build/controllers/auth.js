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
const jwt = require("../util/jwt");
const apollo_server_express_1 = require("apollo-server-express");
const user_1 = require("../models/user");
const ERROR_CODE = require("../config/errorCode");
class AuthController {
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
            const token = authorization.split(" ")[1];
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
                user = jwt.verify(token);
            }
            catch (err) {
                throw new apollo_server_express_1.ApolloError(ERROR_CODE.SESSION_EXPIRED.message, ERROR_CODE.SESSION_EXPIRED.code);
            }
            if (!user) {
                return null;
            }
            const valid = yield user_1.UserModel.isTokenValid({ user_id: user.id, token });
            if (!valid) {
                return null;
            }
            return user;
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.js.map