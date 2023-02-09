const {verifyToken} = require('./verifyToken');

const router = require('express').Router();

 
//update
router.put('/:id', verifyTokenAndAuthorization, async (req, res)=>{
    if(req.body.password){
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
    res.status(500).json(err)
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
router.get('/:id', verifyTokenAndAdmin, async (req, res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
    }catch(err){
       res.status(500).json(err) 
    }
})


module.exports = router;
