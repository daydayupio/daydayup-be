import { BaseModel, BaseDef } from "./baseModel";
import * as uuid from "uuid/v1";
import { tableName } from "../util/decorators/model";

export interface OSSDef {
    token: string
    content: string
}

@tableName("oss")
export class OSSModel extends BaseModel<Partial<OSSDef & BaseDef>> {
    static new(option?: Partial<OSSDef>) {
        return new OSSModel(option)
    }
    public token: string;
    public content: string;
    constructor(params: Partial<OSSDef> = {}) {
        super();
        this.token = params.token || uuid();
        this.content = params.content;
    }
}
