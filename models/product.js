const mongoose = require('mongoose');

//create a schema
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


module.exports = mongoose.model('products', productsSchema);