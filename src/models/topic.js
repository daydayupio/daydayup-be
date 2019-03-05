const ORM = require("./orm")
const { tableName } = require("./decorator")

@tableName("topics")
class TopicModel extends ORM {}

module.exports = TopicModel
