const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);


router.post('/payment', (req, res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "NGR",
    }, (stripErr, stripeRes)=>{
        if(stripErr){
            res.json({
                status: "failed",
                message: "There was an error process your paymnet"
            })
        }else{
            res.json({
                status: 200,
                message: stripeRes
            })
        }
    })
})