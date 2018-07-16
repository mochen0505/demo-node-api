const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const UsersController = require('../controllers/users');

// user sign up captcha
router.post('/getSmsCaptcha', UsersController.signupCaptcha);

// user sign up
router.post('/signup', UsersController.userSignup);

// user sign in
router.post('/signin', UsersController.userSignin);

// user sign out
router.post('/signout', checkAuth, UsersController.userSignout);

// get user profile
router.get('/profile', checkAuth, UsersController.getUserProfile);

// edit user profile
router.post('/profileEdit', checkAuth, UsersController.editUserProfile);

module.exports = router;
