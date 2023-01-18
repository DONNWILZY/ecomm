const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js'); 
//const router = express.router();





// register
router.post('/register', async (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    })

    try{
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err)
    }

   
})


// LOGIN

router.post('/login', async (req, res)=>{
    try{
        const user = await User.findOne({username: req.body.username});
    
       !user && res.status(401).json('wrong username')
        
        
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const mainPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        mainPassword !== req.body.password && res.status(401).json('wrong password');

        //hiding password from database
        const {password, ...others} = user._doc;
         

          // SUCCESS RESPONSE  
        res.status(200).json(others);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;