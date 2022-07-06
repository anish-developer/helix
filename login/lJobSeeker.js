const express = require('express')
const router = express.Router()
const JobSeeker = require('../models/JobSeeker')
const multer  = require('multer')
const bcrypt  = require('bcrypt')

const upload = multer()

router.post('/ljobseeker',upload.none(),async (req,res)=>{
    // res.send('hii')
    const email = req.body.email
    const password = req.body.password
    try {
        const data = await JobSeeker.findOne({j_email:email})
        // res.json(data)
        if(data){
            // check if incoming password is the same the db password
        const validPassword = await bcrypt.compare(password,data.j_password)
            // console.log(data)
            if(validPassword === 'approve'){
                // check admin is give approved or not
                if(data.approve === true){
                    res.json(true)
                }
                else{
                    res.json('admin in not approved')
                }
            }
        }else{
            res.json(false)
        }
    } catch (error) {
        res.status(400).json(error)
    }
})




module.exports = router