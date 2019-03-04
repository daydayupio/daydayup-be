const ORM = require("./orm")
const uuid = require("uuid/v1")
const { tableName } = require("./decorator")

@tableName("oss")
class OSSModel extends ORM {
    /**
     * @param {object} params
     * @param {string} params.token
     * @param {string} params.content
     */
    constructor(params) {
        super(params)
        this.token = params.token || uuid()
        this.content = params.content
    }
}

module.exports = OSSModel
