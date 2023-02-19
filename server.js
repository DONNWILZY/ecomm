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
const productRoute = require('./routes/product');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');


//poduct route

app.get('/', (req, res)=>{
    res.send('i am here')
})

app.use(express.json());



app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products/', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);



app.listen(port, ()=>console.log(`port ${port} Active`))

