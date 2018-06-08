const express = require('express');
const router = express.Router();
const utils = require('../utils/utils');

// import models
const User = require('../models/User');

// POST request
router.post('/signup', function(req, res, next) {
    User.create({
        name: req.body.name,
        mobile: req.body.mobile,
        password: utils.sha1(req.body.password),
        available: req.body.available
    }).then((user) => {
        res.send(user);
    }).catch((next)=>{
        res.send(next)
    });
});

module.exports = router;
