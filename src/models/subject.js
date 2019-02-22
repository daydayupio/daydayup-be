const ORM = require('./orm')

class SubjectModel extends ORM {
}

SubjectModel.tableName = 'subjects'

module.exports = SubjectModel