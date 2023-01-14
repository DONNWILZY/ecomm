const express = require('express');
require('dotenv').config();
//const ejs = require('ejs');
const port = 3000;
const mongoose = require('mongoose');

app = express();


//database connection
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});
const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', ()=>console.log('db connected'));

app.use(express.json());

app.get('/hello', (req, res)=>{
    res.send('hello world')
})

const userRouter = require('./routes/user');
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');

//poduct route

app.use('/products/cat', productsRouter);
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)


app.listen(port, ()=>console.log(`port ${port} Active`))

