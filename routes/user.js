const User = require("../models/User")
const 
{
    verifyToken, 
    verifyTokenAndAuthorization, 
    verifyTokenAndAdmin
} = require('./verifyToken');

const CryptoJS = require("crypto-js");
const { Router } = require('express');
const router = require('express').Router();


 
//update
router.put('/:id',  async (req, res)=>{
    if(req.body.password ){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
         ).toString()
    }

try{
    const updatedUser = await  User.findByIdAndUpdate(req.params.id, {
        //sending information to user
        $set: req.body
    }, 
    {new:true}
);
    res.status(200).json(updatedUser)
}catch(err){
    res.status(500).json(err);
}
})


//delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
    }catch(err){
       res.status(500).json(err) 
    }
})


//get user
//aloows only dmin to get user


router.get('/find/:id', verifyTokenAndAdmin, async (req, res)=>{
    try{
       const user = await User.findById(req.params.id)
       const {password, ...others} = user._doc;
     res.status(200).json(others);
    }catch(err){
       res.status(500).json(err) 
    }
})



// GET ALL USERS
router.get('/', async (req, res)=>{
    //select newer dat frm te dste base usng query - new 
    const query = req.query.new 
    try{
       const users = query ? await User.find().sort({_id: -1}).limit(5): await User.find();
     res.status(200).json(users);
    }catch(err){
       res.status(500).json(err) 
    }
})

//GET USER STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    // sort date for last year
    const lastYear = new Date(date.getFullYear(date.getFullYear()- 1 ));
    try{
        // using mongo db aggregate
        const data = await User.aggregate([
            {$math: {createdAt: {$gte: lastYear}}},
            {
                $project: {
                    month: {$month: "$createdAt"},
                },
            },

            {
                $group:{
                    _id: "$month",
                    total: {$sum: 1},
                },
            },
        ]);
        res.status(200).json(data);
    }catch(err){
        res.json({
            status: "failed",
            Message: "could not sort users. try again"
        })
    }
})


module.exports = router;


