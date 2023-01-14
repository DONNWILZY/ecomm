const router = require('express').Router();
//const router = express.router();

router.get('/usertest', (req, res)=>{
    res.send('helllooooooo')
})

router.post('/userposttest', (req, res)=>{
    const username = req.body.username 
    res.send('your username is' + " " + username)
})


module.exports = router;