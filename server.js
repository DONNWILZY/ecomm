require('dotenv').config();
const express = require('express');
app = express();
//const ejs = require('ejs');
const port = 3000;
const mongoose = require('mongoose');

/*
// import routes
//const registerRoute = require('./routes/register');
///const userRoute = require('./routes/user');
//app.use('/user', userRoute);
//app.use('/register', registerRoute);
//app.set('view egine', 'ejs')
*/

/*
mongoose.connect('mongodb://127.0.0.1:27017', (err)=>{
    if(!err)console.log('db connected');
    else console.log('cNNOT NOT CONNECT TO DB');
})
*/

//database connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=>console.log('db connected'));

app.use(express.json());
const productsRouter = require('./routes/products');
app.use('/products', productsRouter);

app.use('/', (req, res)=>{
    res.send('we are live')
})

app.listen(port, ()=>console.log(`port ${port} Active`))

/*
//////////////////////////AFTER CONNECTING DATABSE

create .env file. becaause you database will not be connected to your localhost on seever

cut db base link to .env file DATABASE_URL=mongodb://127.0.0.1:27017

import dotenv module require('dotenv').config();

add jason file to help us use middle ware
app.use(express.json())


ONE///////// CREATE ROUTE FUNCTION IN SERVER  const productRouter = require('./routes/products')

create route folder and file
routes/prodcuts

use products routes
app.use('/products', productsRouter);


to go to product route
import express 

create router function
const Router = express.router();

// get functions fr all methods

create modle folder
create products.js inside th model
import mongoose tobe able to interact with databse


create a schema
const productsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    productCat:{
        type: String,
        required: true
    },
    ProductDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

//// export module

module.exports = mongoose.model('products', productsSchema);

import product




*/