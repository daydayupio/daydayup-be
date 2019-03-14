"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("./orm");
const uuid = require("uuid/v1");
const decorator_1 = require("./decorator");
let OSSModel = class OSSModel extends orm_1.ORM {
    constructor(params) {
        super();
        this.token = params.token || uuid();
        this.content = params.content;
    }
    getCondition() {
        return {
            token: this.token,
            content: this.content,
        };
    }
};
OSSModel = __decorate([
    decorator_1.tableName("oss")
], OSSModel);
exports.OSSModel = OSSModel;
//# sourceMappingURL=oss.js.map