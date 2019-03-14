import { ORM } from "./orm";
const { tableName } = require("./decorator");

@tableName("topics")
export class TopicModel extends ORM {
    public title: string;
    public description: string;
    public views: number;
    public votes: number;
    public stars: number;
    public opinions: number;
    public archived: boolean;
    public creator_id: number;
    public subject_id: number;
    constructor(params: {
        title: string;
        description: string;
        views: number;
        votes: number;
        stars: number;
        opinions: number;
        archived: boolean;
        creator_id: number;
        subject_id: number;
    }) {
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
    protected getCondition(): Object {
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
}
