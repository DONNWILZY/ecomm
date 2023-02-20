const Order = require("../models/Cart");
const{
    verifyToken, 
    verifyTokenAndAdmin, 
    verifyTokenAndAuthorization
}= require('./verifyToken');

const router = require('express').Router();
//const router = express.router();


router.post('/', verifyToken, async(req, res)=>{
    const newOrder = new Order(req.body)
    try{
        //try block
        const SavedOrder = await newOrder.save();
        res.status(200).json(SavedOrder);

    }catch(err){
        // if the creationwas not sucesful, display errro
        res.json({
            status: 'failed',
            message: "unable add products to cart"
        })
    }
})




 
//update
//only admin can updte
router.put('/:id', verifyTokenAndAdmin , async (req, res)=>{
    

try{
    const updatedOrder = await  Order.findByIdAndUpdate(req.params.id, {
        //sending information to user
        $set: req.body
    }, 
    {new:true}
);
    res.status(200).json(updatedOrder)
}catch(err){
    res.status(500).json(err);
}
})




//delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json('Cart item(s) has been deleted')
    }catch(err){
       res.status(500).json(err) 
    }
})


 

//get User Cart
router.get('/find/:userId', verifyTokenAndAdmin,  async (req, res)=>{
    try{
        /// fins moe=
       const orders = await Order.find({userid: req.params.userId})
     res.status(200).json(Orders);
    }catch(err){
       res.status(500).json(err) 
    }
});



// GET ALL 
router.get('/', verifyTokenAndAdmin, async (req, res)=>{
    try{
        const orders = await Order.find()
        res.json({
            status: "Successful",
            message: orders
        })
    }catch(err){
        res.json({
            status: "FAILED",
            message: "FAILED TO FTECH USER CART"
        })
    }
})


/// monthly income

router.get('/income', verifyTokenAndAdmin, async (req, res)=>{

    const date = new Date();
    const lastMonth =  new Date(date.setMonth(Date.getMonth()-1));
    const previousMonth = new Date (new Date().date.setMonth(lastMonth.getMonth()-1));

    try{

        const income = await Order.aggregate([
            {$match:{ createdAt: {$gte: previousMonth } } },
            {
                $project:{
                    month: {$month: "$createdAt"},
                    sales: "$amount",
                },
                {
                    
                    $group: {
                        _id: "$month",
                        total: {$sum: "$sales"}
                    },
                },
                res.json({
                    $group: {
                        _id: "$month",
                        total: {$sum: "$sales"}
                    },
                },)
        ]);
        res.json({
            status: "successful",
            message:  income
        })

    }catch(err){
        res.json({
            status: "failed",
            message: "failed to feftch income"
        })
    }
})




module.exports = router;