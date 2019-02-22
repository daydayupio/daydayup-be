const ORM = require('./orm')

class PostModel extends ORM{}

PostModel.tableName = 'posts'

module.exports = PostModel