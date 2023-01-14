const router = require('express').Router();
//const router = express.router();

router.get('/usertest', (req, res)=>{
    res.send('helllooooooo')
})


module.exports = router;