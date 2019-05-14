import { BaseModel, BaseDef } from "./baseModel";
import { tableName } from "../util/decorators/model";

export interface AuthorizationDef {
    token: string
    user_id: string
}

@tableName("authorizations")
export class AuthorizationModel extends BaseModel<AuthorizationDef & BaseDef> {
    static db = new AuthorizationModel()
    static new(option?: Partial<AuthorizationDef>) {
        return new AuthorizationModel(option)
    }

    public token: string;
    public user_id: string;
    constructor(params: Partial<AuthorizationDef> = {}) {
        super();
        this.user_id = params.user_id;
        this.token = params.token;
    }
}
