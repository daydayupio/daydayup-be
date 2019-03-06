import { salt, expiresIn } from "../config/jwt"
import * as jwt from "jsonwebtoken"
const defaultOptions = {
    expiresIn,
}

export function sign(payload, options?) {
    const newOptions = Object.assign({}, defaultOptions, options)
    return jwt.sign(payload, salt, newOptions)
}
export function verify(token) {
    return jwt.verify(token, salt)
}
