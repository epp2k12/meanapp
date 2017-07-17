const express = require('express');
const router = express.Router(); 

//Register
router.get('/register', (req, res, next) => {
 res.send("REGISTER");
});

router.post('/register', (req, res, next) => {
 res.send("REGISTER FORM");
});


//Authenticate
router.get('/authenticate', (req, res, next) => {
 res.send('AUTHENTICATE'); 
});

//Profile
router.get('/profile', (req, res, next) => {
 res.send('PROFILE');
});

module.exports = router;
