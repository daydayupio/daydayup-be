const ORM = require("./orm")
const pw = require("../util/password")
const AuthorizationModel = require("./authorization")
const { tableName } = require("./decorator")

@tableName("users")
class UserModel extends ORM {
    static async validate({ name, password }) {
        const { results } = await this.find({
            name,
            password: pw.encrypt(password),
        })
        return results[0]
    }
    static async isTokenValid({ userId, token }) {
        const { results } = await AuthorizationModel.find({
            user_id: userId,
            token,
        })
        return results.length > 0
    }
    static encryptPassword(password) {
        return pw.encrypt(password)
    }
    static async updateToken({ userId, token }) {
        const { results } = await AuthorizationModel.find({ user_id: userId })
        if (results.length === 0) {
            await AuthorizationModel.insert({ user_id: userId, token })
        } else {
            await AuthorizationModel.update({ token }, { user_id: userId })
        }
    }
}

module.exports = UserModel
