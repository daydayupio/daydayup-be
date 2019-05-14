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
const user_1 = require("../../../models/user");
const authorization_1 = require("../../../models/authorization");
const jwt = require("../../../util/jwt");
const pw = require("../../../util/password");
const ERROR_CODE = require("../../../config/errorCode");
const apollo_server_core_1 = require("apollo-server-core");
function mutation(parent, { name, email, password }, context) {
    return __awaiter(this, void 0, void 0, function* () {
        // judge repeat name
        let results = yield user_1.UserModel.db.find({ name });
        if (results.length > 0) {
            throw new apollo_server_core_1.ApolloError(ERROR_CODE.INVALID_USERNAME.message, ERROR_CODE.INVALID_USERNAME.code);
        }
        // insert record
        yield user_1.UserModel.db.insert({
            name,
            email,
            password: pw.encrypt(password),
            role_code: "3",
        });
        const user = yield user_1.UserModel.validate({ name, password });
        if (!user) {
            throw new Error("register error");
        }
        // login
        const token = jwt.sign({ id: user.id, name: user.name });
        // authorization
        authorization_1.AuthorizationModel.db.insert({ user_id: user.id, token });
        return token;
    });
}
exports.mutation = mutation;
//# sourceMappingURL=register.js.map