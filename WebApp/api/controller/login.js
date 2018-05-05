const db = require('../models/db');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');

exports.index_get = (req,res,next)=>{
    
    res.render('login');
}

exports.dashboard = (req,res,next)=>{
    let getStudents = 'select * from temp_students';
    let getTeachers = 'select * from temp_teachers';

    db.query(getStudents,(err,students) => {
        if (err) throw err;
        console.log(students);
        db.query(getTeachers,(err,teachers) => {
            if (err) throw err;

            res.render('dashboard', {
                temp_students:students,
                temp_teachers:teachers
            });
        });
    });
    // console.log(req.user);
    // db.query('select FirstName, LastName from temp_teachers where id like ?',[req.user[0].id], (err,result) => {
    //     if(err) throw err;
    //     res.render('dashboard',{
    //         name:result[0].FirstName,
    //         lname: result[0].LastName,
    //         isAdmin:false
    //     });
    // });
}

exports.handleRegistration = (req,res,next) => {
    console.log(req.body);
    res.jsonp({message:'user handled'});
}

exports.logout = (req,res,next)=>{
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/');
}


exports.login = (req,res,next)=>{
    let userQuery = 'select count(Email) as Email from temp_teachers where Email like ?';
    let passQuery = 'select email, password as pass from temp_teachers where Email = ?';
    let getUserId = 'select id from temp_teachers where Email like ?'

    let email = req.body.email;
    let password = req.body.password;

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },(req,res,next)=>{
       
        db.query(userQuery,[email], (err, result) => {
            if (err) throw err;
            if(result[0].Email == 0){
                return next(null,false, {message:'User NOT found'});
            }
        db.query(passQuery,[email],(err,resu) => {
            if (err) throw err;

            bcrypt.compare(password, resu[0].pass, (err, isMatch) => {
                if(err) throw err;
                if(isMatch){
                    return next(null,resu);
                } else {
                    console.log('wrong password');
                    return next(null,false,{message:'Wrong email or password'});
                }
            });
        });
      });
    }));
    
    passport.serializeUser((user,done)=>{
        console.log('current user logged in: ' +user);
        done(null,user)
    });
    
    passport.deserializeUser((name,done)=>{
        db.query(getUserId,[name[0].email], (err, user) => {
        done(err,user);
        });
    });

    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/',
        failureFlash: true
    })(req,res,next);
}