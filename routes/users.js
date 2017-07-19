const express = require('express');
const router = express.Router(); 
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');


//Register
router.get('/register', (req, res, next) => {
 res.send("REGISTER");
});

router.post('/register', (req, res, next) => {
// res.send("REGISTER FORM");
 let newUser = new User({
   name: req.body.name,
   email: req.body.email,
   username: req.body.username,
   password: req.body.password    
 });
 newUser.addUser(newUser, function(err, user){
  if(err) {
     res.json({success: false, msg: 'Failed to register user'})
  }else {
     console.log(user);
     res.json({success: true, msg: 'User registered!'}); 
  }
 });
});


//Authenticate
router.get('/authenticate', (req, res, next) => {
 res.send('AUTHENTICATE'); 
});

router.post('/authenticate', (req, res, next) => {
 const username = req.body.username;
 const password = req.body.password;
 
    User.getUserByUsername(username, (err, user)=> {
     if(err) throw err;
     // console.log(user);
     if(!user) {
         return res.json({success: false, msg: "User not found"});
     }

     User.comparePassword(password, user.password, function(err, isMatch){
         if(err) throw err;
         if(isMatch){
            const token = jwt.sign(user, config.secret, {
                expiresIn: 604800 // 1 week
            });
                res.json({
                success: true,
                token: 'JWT '+token,
                user: {
                    id: user._id,
                    name: user.name,
                    username: user.username,
                    email: user.email 
                }
            })
         }else{
            return res.json({success: false, msg: "Wrong Password"});
         }
     })
 })
});


//Profile
router.get('/profile', passport.authenticate('jwt', { session:false }), (req, res, next) => {
 res.json({user: req.user});
});

module.exports = router;
