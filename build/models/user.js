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
const orm_1 = require("./orm");
const pw = require("../util/password");
const authorization_1 = require("./authorization");
const decorator_1 = require("./decorator");
let UserModel = class UserModel extends orm_1.ORM {
    constructor(params) {
        super();
        this.name = params.name;
        this.password = params.password;
        this.email = params.email;
        this.role_code = params.rule_code;
    }
    static validate({ name, password }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { results } = yield this.find({
                name,
                password: pw.encrypt(password),
            });
            return results[0];
        });
    }
    static isTokenValid({ userId, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { results } = yield authorization_1.AuthorizationModel.find({
                user_id: userId,
                token,
            });
            return results.length > 0;
        });
    }
    static encryptPassword(password) {
        return pw.encrypt(password);
    }
    static updateToken({ userId, token }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { results } = yield authorization_1.AuthorizationModel.find({ user_id: userId });
            if (results.length === 0) {
                yield authorization_1.AuthorizationModel.insert({ user_id: userId, token });
            }
            else {
                yield authorization_1.AuthorizationModel.update({ token }, { user_id: userId });
            }
        });
    }
    getCondition() {
        return {
            name: this.name,
            password: this.password,
            email: this.email,
            role_code: this.role_code,
        };
    }
};
UserModel = __decorate([
    decorator_1.tableName("users")
], UserModel);
exports.UserModel = UserModel;
//# sourceMappingURL=user.js.map