const express = require('express')
const router = express.Router()
const JobSeeker = require('../models/JobSeeker')
const multer  = require('multer')
const bcrypt= require('bcrypt') 
const upload = multer()

router.post('/jobseeker',upload.none(),async (req,res)=>{
   
    try {
        // let email = req.body.c_email
        const password = req.body.j_password
        const repassword = req.body.j_repassword
         
        console.log(password)
        console.log(repassword)
        const data = await JobSeeker.findOne({j_email:req.body.j_email})
        console.log(data)
        
         //  bcrypt the user password
                const saltRound = 10
                const salt = await bcrypt.genSalt(saltRound);
                
                const bcryptPassword = await bcrypt.hash(password,salt)
                
        if(data === null){
            // res.json('already')
            // console.log('hii')
            console.log(req.body.j_email)
            if(password == repassword){
                const newJobSeeker = new JobSeeker({
                                            j_name: req.body.j_name,
                                            j_number:req.body.j_number,
                                            j_email:req.body.j_email,
                                            j_address:req.body.j_address,
                                            j_password:bcryptPassword,
                                            
                                        })
                                        // save in db
                                const registerJobSeeker =await newJobSeeker.save()
                                        console.log(registerJobSeeker)
                                        res.status(201).json('wait for admin approval')
                                    }else {
                                        res.json('password is not match')
                                    }}
                                    else{
                                        res.json('email is already register')
                                    }   
        }
            
            catch (error) {
            res.status(400).json('mobile number already register or all field are required')
        }
})


module.exports = router