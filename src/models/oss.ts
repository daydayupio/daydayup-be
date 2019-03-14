import { ORM } from "./orm";
import * as uuid from "uuid/v1";
import { tableName } from "./decorator";

@tableName("oss")
export class OSSModel extends ORM {
    public token: string;
    public content: string;
    constructor(params: { token?: string; content: string }) {
        super();
        this.token = params.token || uuid();
        this.content = params.content;
    }
    protected getCondition(): Object {
        return {
            token: this.token,
            content: this.content,
        };
    }
}
