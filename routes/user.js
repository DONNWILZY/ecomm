const {verifyToken} = require('./verifyToken');

const router = require('express').Router();

///tokenization
const verifyTokenAndAuthorization = (req, res, next )=>{
    verifyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json('Not allowed')
        }
    })
}
//const router = express.router();
//update
router.put('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.PASS_SEC
         ).toString()
    }

try{
    const updatedUser = await  User.findbyIdAndUpdate(req.params.id, {
        //sending information to user
        $set: req.body
    }, 
    {new:true}
);
    res.status(200).json(updatedUser)
}catch(err){
    res.status(500).json(err)
}
})



module.exports = router;