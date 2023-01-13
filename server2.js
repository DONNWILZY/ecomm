const express = require('express');
app = express();
const port = 5001;
const fs = require('fs');

// import mongoose
const mongoose = require('mongoose');

//connect to mongoDb
mongoose.connect('mongodb://localhost:27017', (err)=>{
    if (err)console.log('cannot connect to db')
    else console.log('connected to db')
})

app.get('/', (req, res)=>{
    res.send('i am here')
})

app.get('/listUsers', function (req, res) {
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
    });
 })

 var user = {
    "donnwilzy" : {
       "name" : "effiong",
       "password" : "password4",
       "profession" : "Web dev",
       "id": 4
    }
 }
 
 app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data ); ///// thsis is ,y 
       res.end( JSON.stringify(data));
    });
 })

 app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
    });
 })


 app.delete('/deleteUser', function (req, res) {
    // First read existing users.
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
        
       console.log( data );
       res.end( JSON.stringify(data));
    });
 })

app.listen(port, ()=>console.log(`connected to port ${port}`))