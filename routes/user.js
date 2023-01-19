//const { verify } = require('jsonwebtoken');
const{ verifyToken} = require('./verifyToken') 
//const {verify} = require('crypto');
const router = require('express').Router();


//const router = express.router();
router.put('/:id', verifyToken, verifyTokenAndAuthorization, (req, res)=>{
    if(req.body.password){
        req.body.password: CryptoJS.AES.encrypt(
        req.body.password, 
        process.env.PASS_SEC
        ).toString(),
}
})



module.exports = router;