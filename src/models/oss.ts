import { ORM } from "./orm"
import * as uuid from "uuid/v1"
import { tableName } from "./decorator"

@tableName("oss")
export class OSSModel extends ORM {
    private token: string
    private content: string
    constructor(params: { token: string; content: string }) {
        super()
        this.token = params.token || uuid()
        this.content = params.content
    }
}
