const express = require('express');
const router = express.Router();
const product = require('../models/product');


// get all product
router.get('/', (req, res)=>{
    try{
        const products = product.find()
        res.json(products)
        //if successful send the folloew res uses
    } catch (err){
        res.status(500).json({message: err.message})
        //error code is sedning a messge to the user to know when thhere isan errr
    }
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