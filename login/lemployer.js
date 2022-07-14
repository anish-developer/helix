const express = require('express')
const router = express.Router()
const Employer = require('../models/Employer')
const multer  = require('multer')
const bcrypt = require('bcrypt')


const upload = multer()

router.post('/lemployer',upload.none(),async(req,res)=>{
    // res.send('hii')
    try {
        const email = req.body.email
        const password =req.body.password
        console.log(email,password)
        let data = await Employer.findOne({c_email:email})
        console.log(data)
        if(data){

            // check if incoming password is the same the db password
        const validPassword = await bcrypt.compare(password,data.c_password)

        console.log(validPassword)
           if(validPassword === true){
            // res.json(data.approve)

            // check admin approved or not
            console.log(data.approve)
             if(data.approve === "approve"){
                res.status(201).json(true)
            }
     
            else if(data.approve === 'reject'){
                res.status(201).json('admin is not approved')
            }
           }
           else{
            res.json('password is wrong')
           }
        }else{
            res.json('you enter email is not registered')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// find by email
router.post('/profile/:email?',upload.none(),async (req,res)=>{
    try {
        const email = req.params.email
        if(email){
            const findEmail = await Employer.findOne({
                empemail:email
            })
            res.status(201).json(findEmail)
        }else{
            res.status(400).json('invalid email')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router