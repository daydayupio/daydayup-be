import { BaseModel, BaseDef } from "./baseModel";
import { tableName } from "../util/decorators/model";

export interface TopicDef {
    /** 标题 */
    title: string
    /** 描述 */
    description: string
    /** 浏览数 */
    views: number
    /** 投票数 */
    votes: number
    /** 收藏数 */
    stars: number
    /** 观点数 */
    opinions: number
    /** 是否归档 */
    archived: boolean
    /** 创建者 ID */
    creator_id: string
    /** 所属栏目 ID */
    subject_id: string
}

@tableName("topics")
export class TopicModel extends BaseModel<TopicDef & BaseDef> {
    static db = new TopicModel()
    static new(option?: Partial<TopicDef>) {
        return new TopicModel(option)
    }
    public title: string;
    public description: string;
    public views: number;
    public votes: number;
    public stars: number;
    public opinions: number;
    public archived: boolean;
    public creator_id: string;
    public subject_id: string;

    constructor(params: Partial<TopicDef> = {}) {
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
}

TopicModel.prototype.opinions