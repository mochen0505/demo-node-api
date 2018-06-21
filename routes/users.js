const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');
const regs = require('../utils/validators');

// import models
const User = require('../models/User');

// user sign up
router.post('/signup', function(req, res, next) {
    const {body} = req;
    const {name, mobile, password, role} = body;

    if (!name || !mobile || !password) {
        return res.send({
            success: false,
            message: 'Required input cannot be blank'
        });
    }

    if (!regs.mobileValidator(mobile)) {
        return res.send({
            success: false,
            message: 'Bad mobile'
        });
    }

    User.find({
        mobile: mobile
    }).then(prevUsers => {
        if (prevUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Account already exist'
            })
        }
        User.create({
            name: name,
            mobile: mobile,
            password: utils.generateHash(password),
            role: role,
        }).then(user => {
            return res.send({
                success: true,
                message: 'Signed up'
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
});

// user sign in
router.post('/signin', function(req, res, next) {

});

module.exports = router;
