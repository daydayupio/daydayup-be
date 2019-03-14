import { ORM } from "./orm";

const { tableName } = require("./decorator");

@tableName("subjects")
export class SubjectModel extends ORM {
    public name: string;
    public description: string;
    public stars: number;
    public creator_id: number;
    constructor(params: {
        name: string;
        description: string;
        stars: number;
        creator_id: number;
    }) {
        super();
        this.name = params.name;
        this.description = params.description;
        this.stars = params.stars;
        this.creator_id = params.creator_id;
    }
    protected getCondition(): Object {
        return {
            name: this.name,
            description: this.description,
            stars: this.stars,
            creator_id: this.creator_id,
        };
    }
}
