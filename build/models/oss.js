"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var OSSModel_1;
const baseModel_1 = require("./baseModel");
const uuid = require("uuid/v1");
const model_1 = require("../util/decorators/model");
let OSSModel = OSSModel_1 = class OSSModel extends baseModel_1.BaseModel {
    constructor(params = {}) {
        super();
        this.token = params.token || uuid();
        this.content = params.content;
    }
    static new(option) {
        return new OSSModel_1(option);
    }
};
OSSModel = OSSModel_1 = __decorate([
    model_1.tableName("oss")
], OSSModel);
exports.OSSModel = OSSModel;
//# sourceMappingURL=oss.js.map