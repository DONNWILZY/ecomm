const express = require('express');
const app = express();
const path = ('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const PORT = 3000;
const userRoute = require('./routes/user');

dotenv.config()

// mongo db connection
mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log('db connected successfully'))
.catch((err)=>{
    console.log(err);
});

app.use(express.json());
app.use('/api/user', userRoute);


//local host connection
app.listen(PORT, ()=>{
    console.log(`connected to port`)
})