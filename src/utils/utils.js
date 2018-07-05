const bcrypt = require('bcrypt');

module.exports = {
    generateHash: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    validPassword: (password, dPassword) => {
        return bcrypt.compareSync(password, dPassword)
    },

    mobileValidator: (mobile) => {
        const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return mobileReg.test(mobile)
    }
};