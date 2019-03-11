import { ORM } from "./orm";
import { tableName, tableFields } from "./decorator";

const fields = [
    {
        name: "id",
        type: Number,
    },
    {
        name: "user_id",
        type: Number,
    },
    {
        name: "token",
        type: String,
    },
    {
        name: "created_at",
        type: Date,
    },
    {
        name: "updated_at",
        type: Date,
    },
];

@tableName("authorizations")
@tableFields(fields)
export class AuthorizationModel extends ORM {
    private user_id: number;
    constructor({ user_id }) {
        super();
        this.user_id = user_id;
    }
}
