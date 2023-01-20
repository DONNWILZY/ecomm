const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
       
    title: {
            type: String,
            required: true,
        },
    post: {
            type: String,
            required: true,

        },
    tag: {
            type: String,
            required: true,
            
        },
    category: {
            type: String,
            required: true
        },
}, 
{ timestamps: true}
);

module.exports = mongoose.model('Blog', BlogSchema)