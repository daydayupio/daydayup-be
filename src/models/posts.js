const ORM = require("./orm")
const { tableName } = require("./decorator.js")

@tableName("posts")
class PostModel extends ORM {}

module.exports = PostModel
