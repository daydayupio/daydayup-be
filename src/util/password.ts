import { salt } from "../config/password"
import * as crypto from "crypto"
export function encrypt(password: string) {
    return crypto
        .createHmac("sha256", salt)
        .update(password)
        .digest("hex")
}
