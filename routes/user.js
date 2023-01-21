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

router.delete('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    try{
        await User.findbyIdAndDelete(req.params.id)
        res.status(200).json('mesage has been deleted')
    }catch{
       res.status(500).json(err) 
    }
})

// get user
router.get('/:id', verifyTokenAndAdmin, async (req, res)=>{
    try{
     const user =    await User.findbyId(req.params.id)
     const {password, ...others} = user._doc;
     
   res.status(200).json({...others, accessToken});
    }catch{
       res.status(500).json(err) 
    }
}  )

module.exports = router;