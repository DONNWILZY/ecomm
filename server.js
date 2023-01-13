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
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true});
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

