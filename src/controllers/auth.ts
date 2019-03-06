import * as jwt from "../util/jwt"
import { ApolloError } from "apollo-server-express"
import { UserModel } from "../models/user"
import * as ERROR_CODE from "../config/errorCode"

export class AuthController {
    /**
     *
     * @param {object} payload
     * @param {string} payload.name
     * @param {string} payload.password
     */
    static login(payload) {
        return jwt.sign({ name: payload.name })
    }
    static async getUserByAuthorization(authorization) {
        const token = authorization.split(" ")[1]
        return await this.getUserByToken(token)
    }
    static async getUserByToken(token) {
        if (!token) {
            return null
        }
        let user
        try {
            user = jwt.verify(token)
        } catch (err) {
            throw new ApolloError(
                ERROR_CODE.SESSION_EXPIRED.message,
                ERROR_CODE.SESSION_EXPIRED.code
            )
        }
        if (!user) {
            return null
        }
        const valid = await UserModel.isTokenValid({ userId: user.id, token })
        if (!valid) {
            return null
        }
        return user
    }
}
