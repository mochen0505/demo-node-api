const utils = require('../utils/utils');
const jwt = require('jsonwebtoken');

/**
 * 状态码说明
 * 1000：成功
 * 2000：权限错误
 * 3000：业务参数错误
 */

// import models
const User = require('../models/User');

module.exports = {
    //TODO: captcha
    userSignup: (req, res, next) => {
        const {name, mobile, password} = req.body;
        if (!name || !mobile || !password) {
            return res.send({
                code: 3000,
                message: 'Required input cannot be blank'
            });
        }
        if (!utils.mobileValidator(mobile)) {
            return res.send({
                code: 3000,
                message: 'Bad mobile'
            });
        }
        User.find({
            mobile: mobile
        }).then(users => {
            if (users.length > 0) {
                return res.send({
                    code: 3000,
                    message: 'Account already exist'
                })
            }
            User.create({
                name: name,
                mobile: mobile,
                password: utils.generateHash(password),
            }).then(user => {
                const token = jwt.sign({userId: user._id, username: user.name}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                return res.send({
                    code: 1000,
                    message: 'Signed up',
                    data:{token}
                })
            }).catch(err => {
                return res.send({
                    code: 3000,
                    message: 'Server error'
                })
            });
        }).catch(err => {
            return res.send({
                code: 3000,
                message: 'Server error'
            })
        });
    },
    userSignin: (req, res, next) => {
        const {mobile, password} = req.body;
        if (!mobile || !password) {
            return res.send({
                code: 3000,
                message: 'Required input cannot be blank'
            });
        }
        if (!utils.mobileValidator(mobile)) {
            return res.send({
                code: 3000,
                message: 'Bad mobile'
            });
        }
        User.find({
            mobile: mobile
        }).then(users => {
            if (users.length !== 1) {
                return res.send({
                    code: 3000,
                    message: 'Auth failed'
                })
            }
            const user = users[0];
            if (!utils.validPassword(password, user.password)) {
                return res.send({
                    code: 3000,
                    message: 'Auth failed'
                })
            } else {
                const token = jwt.sign({userId: user._id, username: user.name}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                return res.send({
                    code: 1000,
                    message: 'Success',
                    data:{token}
                })
            }
        }).catch(err => {
            return res.send({
                code: 3000,
                message: 'Server error'
            })
        });
    },
    getUserProfile: (req, res, next) => {
        //TODO
        return res.send({
            code: 1000
        });
    }
};