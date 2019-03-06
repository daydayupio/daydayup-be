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
function mutation(parent, data, context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!context.user) {
            throw new Error("not login");
        }
        const userId = context.user.id;
        const condition = {};
        Object.entries(data).forEach(([key, val]) => {
            condition[key] =
                key === "password" ? user_1.UserModel.encryptPassword(val) : val;
        });
        yield user_1.UserModel.update(condition, { id: userId });
        const { results } = yield user_1.UserModel.find({ id: userId });
        const user = results[0];
        context.user = { id: user.id, name: user.name };
        const token = jwt.sign({ id: user.id, name: user.name });
        yield user_1.UserModel.updateToken({ userId: user.id, token });
        return token;
    });
}
exports.mutation = mutation;
//# sourceMappingURL=updateProfile.js.map