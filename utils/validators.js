module.exports = {
    mobileValidator: (mobile) => {
        const mobileReg = /^[1][3,4,5,7,8][0-9]{9}$/;
        return mobileReg.test(mobile)
    }
};