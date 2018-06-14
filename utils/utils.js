const bcrypt = require('bcrypt');

module.exports = {
    generateHash : (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    }
};