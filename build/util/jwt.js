"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../config/jwt");
const jwt = require("jsonwebtoken");
const defaultOptions = {
    expiresIn: jwt_1.expiresIn,
};
function sign(payload, options) {
    const newOptions = Object.assign({}, defaultOptions, options);
    return jwt.sign(payload, jwt_1.salt, newOptions);
}
exports.sign = sign;
function verify(token) {
    return jwt.verify(token, jwt_1.salt);
}
exports.verify = verify;
//# sourceMappingURL=jwt.js.map