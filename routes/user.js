//const { verify } = require('jsonwebtoken');
const{ verifyToken} = require('./verifyToken') 
//const {verify} = require('crypto');
const router = require('express').Router();


//const router = express.router();
router.put('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
        req.body.password, 
        process.env.PASS_SEC
        ).toString();
}

try{
    const updateUser = await User.findbyIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new:true}
)
}catch(err){
    res.status(500).json(err)
}
})



module.exports = router;