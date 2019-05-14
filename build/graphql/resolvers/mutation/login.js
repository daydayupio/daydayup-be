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
const jwt = require("../../../util/jwt");
const user_1 = require("../../../models/user");
const ERROR_CODE = require("../../../config/errorCode");
const apollo_server_express_1 = require("apollo-server-express");
function mutation(parent, { name, password }, context) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.UserModel.validate({ name, password });
        if (!user) {
            throw new apollo_server_express_1.ApolloError(ERROR_CODE.INVALID_LOGIN.message, ERROR_CODE.INVALID_LOGIN.code);
        }
        const token = jwt.sign({ id: user.id, name: user.name });
        yield user_1.UserModel.updateToken({ user_id: user.id, token });
        return token;
    });
}
exports.mutation = mutation;
//# sourceMappingURL=login.js.map