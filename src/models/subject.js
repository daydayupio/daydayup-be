const ORM = require("./orm")

const { tableName } = require("./decorator")

@tableName("subjects")
class SubjectModel extends ORM {}

module.exports = SubjectModel
