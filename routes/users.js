const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');
const regs = require('../utils/validators');

// import models
const User = require('../models/User');

// POST request
router.post('/signup', function(req, res, next) {
    const {body} = req;
    const {name, mobile, password, role} = body;

    if (!name || !mobile || !password) {
        return res.send({
            success: false,
            message: 'Error: Required input cannot be blank'
        });
    }

    if (!regs.mobileValidator(mobile)) {
        return res.send({
            success: false,
            message: 'Error: Bad mobile'
        });
    }

    User.find({
        mobile: mobile
    }).then(prevUsers => {
        if (prevUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: account already exist'
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
                message: 'Error: server error'
            })
        });
    }).catch(err => {
        return res.send({
            success: false,
            message: 'Error: server error'
        })
    });
});

module.exports = router;
