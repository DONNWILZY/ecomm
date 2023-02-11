const Product = require("../models/Product")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
const CryptoJS = require("crypto-js");
const { Router } = require('express');
const router = require('express').Router();

//create product

router.post('/', verifyTokenAndAdmin, async(req, res)=>{
    const newProduct = new Product(req.body)
    try{
        //try block
        const SavedProduct = await newProduct.save();
        res.status(200).json(SavedProduct);

    }catch(err){
        // if the creationwas not sucesful, display errro
        res.json({
            status: 'failed',
            message: "unable to create new product"
        })
    }
})




 
//update
router.put('/:id', verifyTokenAndAdmin , async (req, res)=>{
    

try{
    const updatedProduct = await  Product.findByIdAndUpdate(req.params.id, {
        //sending information to user
        $set: req.body
    }, 
    {new:true}
);
    res.status(200).json(updatedProduct)
}catch(err){
    res.status(500).json(err);
}
})




//delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('product  has been deleted')
    }catch(err){
       res.status(500).json(err) 
    }
})




//get PRODUCTSS
// BOTH USER AND  Admin CAN SEE PRODUCTS


router.get('/find/:id',  async (req, res)=>{
    try{
       const product = await Product.findById(req.params.id)
     res.status(200).json(product);
    }catch(err){
       res.status(500).json(err) 
    }
});


// GET ALL PRODUCTS
router.get('/', async (req, res)=>{
    //select newer dat frm te dste base usng query - new 
    const qNew = req.query.new ;
    const qCategory = req.query.category
    try{
let products;

if(qNew){
    products = await Product.find().sort({createdAt: -1}).limit(5)

}else if(qCategory){
    products = await Product.find({categories:{
        $in: [qCategory],
    }
});
}else{
    products = await Product.find();
}
     res.status(200).json(users);
    }catch(err){
       res.status(500).json(err) 
    }
})

/*



/*
//GET USER STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date();
    // sort date for last year
    const lastYear = new Date(date.getFullYear(date.getFullYear()- 1 ));
    try{
        // using mongo db aggregate
        const data = await user.aggregate([
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

*/

module.exports = router;
