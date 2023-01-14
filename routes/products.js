const express = require('express');
const router = express.Router();
const product = require('../models/product');


// get all product
router.get('/', (req, res)=>{
    res.send('i am product')
} )

//get one
router.get('/:id', async (req, res)=>{
   
})

//creating one
router.post('/', (req, res)=>{
   
} )

//updating one
router.patch('/', (req, res)=>{
   
} )

//deting one
router.delete('/:id', (req, res)=>{
   
} )



module.exports = router