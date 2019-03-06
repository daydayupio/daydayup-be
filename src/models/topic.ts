import { ORM } from "./orm"
const { tableName } = require("./decorator")

@tableName("topics")
export class TopicModel extends ORM {}
