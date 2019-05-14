import { BaseModel, BaseDef } from "./baseModel";
import { tableName } from "../util/decorators/model";

export interface SubjectDef {
    /** 名称 */
    name: string
    /** 描述 */
    description: string
    /** 关注数 */
    stars: number
    /** 创建者 ID */
    creator_id: number
}

@tableName("subjects")
export class SubjectModel extends BaseModel<SubjectDef & BaseDef> {
    static db = new SubjectModel()
    static new(option?: Partial<SubjectDef>) {
        return new SubjectModel(option)
    }
    public name: string;
    public description: string;
    public stars: number;
    public creator_id: number;
    constructor(params: Partial<SubjectDef> = {}) {
        super();
        this.name = params.name;
        this.description = params.description;
        this.stars = params.stars;
        this.creator_id = params.creator_id;
    }
}
