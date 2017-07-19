const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema; 

//User Schema
var UserSchema = new Schema ({
 name: {
     type: String,
     required: true 
 },
 email: {
     type: String,
     required: true 
 },
 username: {
     type: String,
     required: true 
 },
 password: {
     type: String,
     required: true 
 }
});

UserSchema.methods.addUser = function(newUser, callback) {

      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
          })
    });
    //console.log('the outside hash : '+this.theHash);
    //this.password = hash;
    //this.save(callback); 
}

UserSchema.statics.getUserById = function(jwt_payload, callback) {
    //console.log(jwt_payload);
    this.findById(jwt_payload._doc._id, callback); 
}

UserSchema.statics.getUserByUsername = function(username, callback) {
    console.log('the user name : '+username);
    const query = { username : username };
    this.findOne(query, callback);
}



var User = module.exports = mongoose.model('User', UserSchema); 

module.exports.comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    })
}


