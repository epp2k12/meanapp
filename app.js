const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config/database'); 
const mongoose = require('mongoose');


mongoose.connect(config.database);
//On Connection
mongoose.connection.on('connected', ()=>{
 console.log("Connected to database : " + config.database);
})
//On Database Error
mongoose.connection.on('error', (err)=>{
 console.log("Database error : " + err);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

//cors middleware Cross Origin Resource Sharing 
app.use(cors()); 

//set static folder
app.use(express.static(path.join(__dirname,'public')));

//body parser middleware
app.use(bodyParser.json());



//index route
app.get('/', function(req, res) {
 res.send("Invalid Endpoint!");
});

app.use('/users',users); 


//start server
app.listen(port, function(){
    console.log( "Server started on port : " + port);
});
