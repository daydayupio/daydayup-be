"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TopicModel_1;
const baseModel_1 = require("./baseModel");
const model_1 = require("../util/decorators/model");
let TopicModel = TopicModel_1 = class TopicModel extends baseModel_1.BaseModel {
    constructor(params = {}) {
        super();
        this.title = params.title;
        this.description = params.description;
        this.views = params.views;
        this.votes = params.votes;
        this.stars = params.stars;
        this.opinions = params.opinions;
        this.archived = params.archived;
        this.creator_id = params.creator_id;
        this.subject_id = params.subject_id;
    }
    static new(option) {
        return new TopicModel_1(option);
    }
};
TopicModel.db = new TopicModel_1();
TopicModel = TopicModel_1 = __decorate([
    model_1.tableName("topics")
], TopicModel);
exports.TopicModel = TopicModel;
TopicModel.prototype.opinions;
//# sourceMappingURL=topic.js.map