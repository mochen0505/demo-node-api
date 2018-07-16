const utils = require('../utils/utils');
const jwt = require('jsonwebtoken');

/**
 * code explanation
 * 1000：succeed
 * 2000：authentication error
 * 3000：other error
 */

// import models
const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const CAPTCHA = '123456';

module.exports = {
    signupCaptcha: (req, res, next) => {
        const {mobile} = req.body;
        if (!mobile) {
            return res.send({
                code: 3000,
                message: 'Required input cannot be blank'
            });
        }
        if (!utils.mobileValidator(mobile)) {
            return res.send({
                code: 3000,
                message: 'Bad input'
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
            return res.send({
                code: 1000,
                message: 'Success',
                data: {code: '123456'}
            });
        }).catch(err => {
            return res.send({
                code: 3000,
                message: 'Server error'
            })
        });
    },
    userSignup: (req, res, next) => {
        const {name, mobile, password, confirmPassword, captcha} = req.body;
        if (!name || !mobile || !password || !confirmPassword || !captcha) {
            return res.send({
                code: 3000,
                message: 'Required input cannot be blank'
            });
        }
        if (!utils.nameValidator(name) || !utils.mobileValidator(mobile) || !utils.passValidator(password) || !utils.confirmPassword(password, confirmPassword)) {
            return res.send({
                code: 3000,
                message: 'Bad input'
            });
        }
        // fake captcha
        if (captcha !== CAPTCHA) {
            return res.send({
                code: 3000,
                message: 'Bad captcha'
            });
        }
        User.find({
            name: name
        }).then(users => {
            if (users.length > 0) {
                return res.send({
                    code: 3000,
                    message: 'Account already exist'
                })
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
                    const token = jwt.sign({username: user.name}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    req.app.set('loggedOut', false);
                    UserProfile.create({
                        name: user.name,
                        mobile: user.mobile,
                    });
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
        })
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
                const token = jwt.sign({username: user.name}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                req.app.set('loggedOut', false);
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
    userSignout: (req, res, next) => {
        req.app.set('loggedOut', true);
        return res.send({
            code: 1000,
            message: 'Logged out',
            data: {token: null}
        })
    },
    getUserProfile: (req, res, next) => {
        const {username} = req.decoded;
        UserProfile.findOne({
            name: username,
        }).select(
            "name mobile avatar gender country city"
        ).then(userProfile => {
            return res.send({
                code: 1000,
                message: 'Success',
                data: userProfile,
            })
        }).catch(err => {
            console.log(err);
            return res.send({
                code: 3000,
                message: 'Server error'
            })
        });
    },
    editUserProfile: (req, res, next) => {
        const {username} = req.decoded;
        const {avatar, gender, country, city} = req.body;
        UserProfile.findOneAndUpdate({
            name: username,
        }, {
            avatar: avatar,
            gender: gender,
            country: country,
            city: city,
        }).then(userProfile => {
            return res.send({
                code: 1000,
                message: 'Success'
            })
        }).catch(err => {
            return res.send({
                code: 3000,
                message: 'Server error'
            })
        })
    },
};