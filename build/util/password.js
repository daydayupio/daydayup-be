"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("../config/password");
const crypto = require("crypto");
function encrypt(password) {
    return crypto
        .createHmac("sha256", password_1.salt)
        .update(password)
        .digest("hex");
}
exports.encrypt = encrypt;
//# sourceMappingURL=password.js.map