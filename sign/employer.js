const express = require('express')
const router = express.Router()
const JobSeeker  = require('../models/JobSeeker')
const Employer  = require('../models/Employer')
const multer  = require('multer')
const bcrypt  = require('bcrypt')


// storage
const Storage = multer.diskStorage({
    destination:'uploads',
    filename:(req,file,cb)=>{
        cb(null,Date.now() + file.originalname)
    }
})

const upload = multer({
    storage:Storage
})
router.post('/employer',upload.single('c_logo'),async (req,res)=>{

try {
    // const email = req.body.c_email
    const password = req.body.c_password
    const repassword = req.body.c_repassword
     
    console.log(password) 
    console.log(repassword)
    let data = await Employer.findOne({c_email:req.body.c_email})
    // console.log(dat  a)
    
    // bcrypt the user password
    const saltRound = 10
    const salt = await bcrypt.genSalt(saltRound);
    
    const bcryptPassword = await bcrypt.hash(password,salt)
    
    if(data === null){
        // res.json('already')
        if(password === repassword){
                        console.log(req.file)
                                // console.log(req.body.c_email)
                                     
                                        const newEmployer = new Employer({
                                        c_name: req.body.c_name,
                                        c_logo:{
                                            data:req.file.filename,
                                            contentType: 'image/png'
                                        
                                        },
                                        c_address:req.body.c_address,
                                        c_person:req.body.c_person,
                                        c_number:req.body.c_number,
                                        c_email:req.body.c_email,
                                        c_password:bcryptPassword,
                                        c_description:req.body.c_description,
                                        
                                    })
                                    // save in db
                            const registeremployee =await newEmployer.save()
                                    // console.log(registeremployee)
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
 } )


module.exports = router