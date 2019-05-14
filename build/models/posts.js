"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PostModel_1;
const baseModel_1 = require("./baseModel");
const model_1 = require("../util/decorators/model");
let PostModel = PostModel_1 = class PostModel extends baseModel_1.BaseModel {
    constructor(_option = {}) {
        super();
    }
    static new(option) {
        return new PostModel_1(option);
    }
};
PostModel.db = new PostModel_1();
PostModel = PostModel_1 = __decorate([
    model_1.tableName("posts")
], PostModel);
exports.PostModel = PostModel;
//# sourceMappingURL=posts.js.map