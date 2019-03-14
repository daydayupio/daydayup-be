import { ORM } from "./orm";
import { tableName } from "./decorator";

@tableName("authorizations")
export class AuthorizationModel extends ORM {
    public token: string;
    public user_id: number;
    constructor(params: { user_id: number; token: string }) {
        super();
        this.user_id = params.user_id;
        this.token = params.token;
    }
    protected getCondition(): Object {
        return {
            token: this.token,
            user_id: this.user_id,
        };
    }
}
