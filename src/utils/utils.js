const bcrypt = require('bcrypt');

module.exports = {
    generateHash: (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    },

    validPassword: (password, dPassword) => {
        return bcrypt.compareSync(password, dPassword)
    },

    nameValidator: (name) => {
        const nameReg = /([a-zA-Z0-9]|[\u4E00-\u9FA5]){5,12}/;
        return nameReg.test(name)
    },

    mobileValidator: (mobile) => {
        const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return mobileReg.test(mobile)
    },

    passValidator: (password) => {
        const passwordReg = /([a-zA-Z0-9_]){6,13}/;
        return passwordReg.test(password)
    },

    confirmPassword: (password, cPassword) => {
        return password === cPassword
    }
};