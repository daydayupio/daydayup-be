"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const orm_1 = require("./orm");
const { tableName } = require("./decorator");
let TopicModel = class TopicModel extends orm_1.ORM {
    constructor(params) {
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
    getCondition() {
        return {
            title: this.title,
            description: this.description,
            views: this.views,
            votes: this.votes,
            stars: this.stars,
            opinions: this.opinions,
            archived: this.archived,
            creator_id: this.creator_id,
            subject_id: this.subject_id,
        };
    }
};
TopicModel = __decorate([
    tableName("topics")
], TopicModel);
exports.TopicModel = TopicModel;
//# sourceMappingURL=topic.js.map