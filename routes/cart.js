const Product = require("../models/Product")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const CryptoJS = require("crypto-js");
const { Router } = require('express');
const router = require('express').Router();

//create

router.post('/', verifyToken, async(req, res)=>{
    const newCart = new Cart(req.body)
    try{
        //try block
        const SavedCart = await newCart.save();
        res.status(200).json(SavedCart);

    }catch(err){
        // if the creationwas not sucesful, display errro
        res.json({
            status: 'failed',
            message: "unable add products to cart"
        })
    }
})




 
//update
//user can change cart
router.put('/:id', verifyTokenAndAuthorization , async (req, res)=>{
    

try{
    const updatedCart = await  Cart.findByIdAndUpdate(req.params.id, {
        //sending information to user
        $set: req.body
    }, 
    {new:true}
);
    res.status(200).json(updatedCart)
}catch(err){
    res.status(500).json(err);
}
})




//delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart item(s) has been deleted')
    }catch(err){
       res.status(500).json(err) 
    }
})




//get User Cart
router.get('/find/:userId', verifyTokenAndAuthorization,  async (req, res)=>{
    try{
       const cart = await Cart.findOne({userid: req.params.userId})
     res.status(200).json(cart);
    }catch(err){
       res.status(500).json(err) 
    }
});



// GET ALL 
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    try{
        const cart = await Cart.find()
        res.json({
            status: "Successful",
            message: cart
        })
    }catch(err){
        res.json({
            status: "FAILED",
            message: "FAILED TO FTECH USER CART"
        })
    }
})
module.exports = router;
