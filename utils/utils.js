const sha1 =  require('js-sha1');

module.exports = {
    sha1: (str) => {
        const salt = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if(str) return sha1(str + salt);
        else return null;
    }
};