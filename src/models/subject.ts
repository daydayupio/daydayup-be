import { ORM } from "./orm"

const { tableName } = require("./decorator")

@tableName("subjects")
export class SubjectModel extends ORM {}
