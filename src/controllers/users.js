const utils = require('../utils/utils');
const jwt = require('jsonwebtoken');

// import models
const User = require('../models/User');

module.exports = {
    //TODO: ccap captcha
    userSignup: (req, res, next) => {
        const {name, mobile, password} = req.body;
        if (!name || !mobile || !password) {
            return res.send({
                success: false,
                message: 'Required input cannot be blank'
            });
        }
        if (!utils.mobileValidator(mobile)) {
            return res.send({
                success: false,
                message: 'Bad mobile'
            });
        }
        User.find({
            mobile: mobile
        }).then(users => {
            if (users.length > 0) {
                return res.send({
                    success: false,
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
                    success: true,
                    message: 'Signed up',
                    data:{token}
                })
            }).catch(err => {
                return res.send({
                    success: false,
                    message: 'Server error'
                })
            });
        }).catch(err => {
            return res.send({
                success: false,
                message: 'Server error'
            })
        });
    },
    userSignin: (req, res, next) => {
        const {mobile, password} = req.body;
        if (!mobile || !password) {
            return res.send({
                success: false,
                message: 'Required input cannot be blank'
            });
        }
        if (!utils.mobileValidator(mobile)) {
            return res.send({
                success: false,
                message: 'Bad mobile'
            });
        }
        User.find({
            mobile: mobile
        }).then(users => {
            if (users.length !== 1) {
                return res.send({
                    success: false,
                    message: 'Auth failed'
                })
            }
            const user = users[0];
            if (!utils.validPassword(password, user.password)) {
                return res.send({
                    success: false,
                    message: 'Auth failed'
                })
            } else {
                const token = jwt.sign({userId: user._id, username: user.name}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                return res.send({
                    success: true,
                    message: 'Success',
                    data:{token}
                })
            }
        }).catch(err => {
            return res.send({
                success: false,
                message: 'Server error'
            })
        });
    },
    getUserProfile: (req, res, next) => {
        //TODO
        return res.send({
            success: true
        });
    }
};