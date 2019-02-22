const ORM = require("./orm")

class TopicModel extends ORM {
}

TopicModel.tableName = 'topics'

module.exports = TopicModel