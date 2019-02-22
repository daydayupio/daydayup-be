const ORM = require('./orm')

class OSSModel extends ORM {}

OSSModel.tableName = 'oss'

module.exports = OSSModel