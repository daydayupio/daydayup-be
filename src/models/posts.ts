import { BaseModel, BaseDef } from "./baseModel";
import { tableName } from "../util/decorators/model";

export interface PostDef {
}

@tableName("posts")
export class PostModel extends BaseModel<PostDef & BaseDef> {
    static db = new PostModel()
    static new(option?: Partial<PostDef>) {
        return new PostModel(option)
    }

    constructor(_option: Partial<PostDef> = {}) {
        super()
    }
}
