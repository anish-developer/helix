const express = require('express')
const router = express.Router()

router.get('/lemployer',(req,res)=>{
    res.send('hii')
})


module.exports = router