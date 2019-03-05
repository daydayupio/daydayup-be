var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const jwt = require('../../../util/jwt');
const UserModel = require('../../../models/user');
module.exports = function (parent, data, context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!context.user) {
            throw new Error('not login');
        }
        const userId = context.user.id;
        const condition = {};
        Object.entries(data).forEach(([key, val]) => {
            condition[key] = key === 'password' ? UserModel.encryptPassword(val) : val;
        });
        yield UserModel.update(condition, { id: userId });
        const { results } = yield UserModel.find({ id: userId });
        const user = results[0];
        context.user = { id: user.id, name: user.name };
        const token = jwt.sign({ id: user.id, name: user.name });
        yield UserModel.updateToken({ userId: user.id, token });
        return token;
    });
};
//# sourceMappingURL=updateProfile.js.map