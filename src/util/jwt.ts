import { salt, expiresIn } from "../config/jwt"
import * as jwt from "jsonwebtoken"
const defaultOptions = {
    expiresIn,
}

export interface signPayload {
    id?: string
    name: string
}

export function sign(payload: signPayload, options?: jwt.SignOptions) {
    const newOptions = Object.assign({}, defaultOptions, options)
    return jwt.sign(payload, salt, newOptions)
}

export function verify(token: string) {
    return jwt.verify(token, salt)
}
