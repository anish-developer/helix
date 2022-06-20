const express = require('express')
const router = express.Router()

router.get('/ljobseeker',(req,res)=>{
    res.send('hii')
})


module.exports = router