const router = require('express').Router();
const User = require('../models/User');
//const router = express.router();

// register
router.post('/register', async (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    })

    try{
        const savedUser = await newUser.save()
        res.sendStatus(201).jason(savedUser);
    }catch(err){
        res.sendStatus(500).jason(err)
    }

   
})


module.exports = router;