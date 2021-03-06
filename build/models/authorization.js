"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AuthorizationModel_1;
const baseModel_1 = require("./baseModel");
const model_1 = require("../util/decorators/model");
let AuthorizationModel = AuthorizationModel_1 = class AuthorizationModel extends baseModel_1.BaseModel {
    constructor(params = {}) {
        super();
        this.user_id = params.user_id;
        this.token = params.token;
    }
    static new(option) {
        return new AuthorizationModel_1(option);
    }
};
AuthorizationModel.db = new AuthorizationModel_1();
AuthorizationModel = AuthorizationModel_1 = __decorate([
    model_1.tableName("authorizations")
], AuthorizationModel);
exports.AuthorizationModel = AuthorizationModel;
//# sourceMappingURL=authorization.js.map