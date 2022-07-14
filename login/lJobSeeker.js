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
        console.log(data)
        if(data){
            // check if incoming password is the same the db password
        const validPassword = await bcrypt.compare(password,data.j_password)
            // console.log(validPassword)
            if(validPassword === true){
                // check admin is give approved or not
                if(data.approve === 'approve'){
                    res.status(201).json(true)
                }
                else if(data.approve === 'approve'){
                    res.json('admin in not approved')
                }
                else{
                    res.json('wait for admin approval')
                }
            }else{
                res.json('password is wrong')
            }
        }else{
            res.json('you enter email is not registered')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})




module.exports = router