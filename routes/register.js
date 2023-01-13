const express = require('express');
const router = express.router();

router.get('/', (req, res)=>{
    res.send('i am here')
})

module.exports = router