const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var Schema = mongoose.Schema; 

//User Schema
var UserSchema = new Schema ({
 name: {
     type: String,
     require: true 
 },
 email: {
     type: String,
     require: true 
 },
 username: {
     type: String,
     require: true 
 },
 password: {
     type: String,
     require: true 
 }
});

UserSchema.methods

var User = module.exports = mongoose.model('User, UserSchema'); 



