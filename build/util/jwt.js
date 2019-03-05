const { salt, expiresIn } = require('../config/jwt');
const jwt = require('jsonwebtoken');
const defaultOptions = {
    expiresIn,
};
module.exports = {
    /**
     * sign
     * @param {*} payload
     * @param {SignOptions} options
     */
    sign(payload, options) {
        const newOptions = Object.assign({}, defaultOptions, options);
        return jwt.sign(payload, salt, newOptions);
    },
    verify(token) {
        return jwt.verify(token, salt);
    }
};
//# sourceMappingURL=jwt.js.map