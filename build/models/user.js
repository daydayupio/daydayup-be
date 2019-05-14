"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserModel_1;
const baseModel_1 = require("./baseModel");
const pw = require("../util/password");
const authorization_1 = require("./authorization");
const model_1 = require("../util/decorators/model");
let UserModel = UserModel_1 = class UserModel extends baseModel_1.BaseModel {
    constructor(params = {}) {
        super();
        this.name = params.name;
        this.password = params.password;
        this.email = params.email;
        this.role_code = params.role_code;
    }
    static new(option) {
        return new UserModel_1(option);
    }
    /** 查询符合对应条件的 user */
    static validate({ name, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield UserModel_1.db.find({
                name,
                password: pw.encrypt(password),
            });
            return results[0];
        });
    }
    /** 查询 token 是否有效 */
    static isTokenValid({ user_id, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield authorization_1.AuthorizationModel.db.find({
                user_id,
                token,
            });
            return results.length > 0;
        });
    }
    /** 更新 token */
    static updateToken({ user_id, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            yield authorization_1.AuthorizationModel.db.insertOrUpdate({ token }, { user_id });
        });
    }
};
UserModel.db = new UserModel_1();
UserModel = UserModel_1 = __decorate([
    model_1.tableName("users")
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map