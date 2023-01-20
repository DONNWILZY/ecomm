const express = require('express');
const router = express.router();

router.get('/blog', (req, res)=>{
    res.send('i am here')
})

module.exports = router