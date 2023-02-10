const express = require('express');
require('dotenv').config();
//const ejs = require('ejs');
const port = 3000;
const mongoose = require('mongoose');

app = express();


//database connection
mongoose.connect(process.env.MONGO_URL && process.env.DATABASE_URL , {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=>console.log('db connected'));



const userRoute = require('./routes/user');
const productsRoute = require('./routes/products');
const authRoute = require('./routes/auth');

//poduct route

app.get('/', (req, res)=>{
    res.send('i am here')
})

app.use(express.json());

app.get('/hello', (req, res)=>{
    res.send('hello world')
})


app.use('/api/users', userRoute)
app.use('/products/cat', productsRoute);
app.use('/api/auth', authRoute)



app.listen(port, ()=>console.log(`port ${port} Active`))

