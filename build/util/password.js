const passwordConf = require('../config/password');
const crypto = require('crypto');
module.exports = {
    encrypt(password) {
        return crypto.createHmac('sha256', passwordConf.salt)
            .update(password)
            .digest('hex');
    }
};
//# sourceMappingURL=password.js.map