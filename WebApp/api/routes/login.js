const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').strategy;
const flash = require('connect-flash');
const authTeacher = require('../middleware/authTeacher');

//Import controller
const loginController = require('../controller/login');

router.get('/',loginController.index_get);
router.get('/dashboard',authTeacher,loginController.dashboard);
router.post('/login',loginController.login);
router.get('/logout', loginController.logout);
router.get('/send/:id',authTeacher,loginController.send_mail);
router.get('/delete/:id',authTeacher,loginController.decline_user);



module.exports = router;