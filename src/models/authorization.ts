import { ORM } from "./orm"
import { tableName } from "./decorator"

@tableName("authorizations")
export class AuthorizationModel extends ORM {
    private user_id: number
    constructor({ user_id }) {
        super()
        this.user_id = user_id
    }
}
