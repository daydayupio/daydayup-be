const ORM = require("./orm")
const { tableName } = require("./decorator")

@tableName("authorizations")
class AuthorizationModel extends ORM {
    constructor({ user_id }) {
        super()
        this.user_id = user_id
    }
}

module.exports = AuthorizationModel
