const express = require('express')
const router = express.Router()
const JobSeeker = require('../models/JobSeeker')
const Employer = require('../models/Employer')
const multer  = require('multer')
const bcrypt  = require('bcrypt')
const Admin = require('../models/Admin')

const upload = multer()

router.post('/checklogin',upload.none(),async(req,res)=>{
    // console.log(email,password)
    try {
        // console.log('hii')
        const email = req.body.email
        const password = req.body.password
        const job = await JobSeeker.findOne({j_email:email})
        const emp = await Employer.findOne({c_email:email})
        const admin = await Admin.findOne({a_email:email})

        if(job){
            console.log(job)
            const validPassword = await bcrypt.compare(password,job.j_password)
            // console.log(password)
            if(validPassword === true){
                // console.log('hii')
                // check admin is give approved or not
                if(job.approve === 'approve'){
                    res.json('jobseeker')
                }
                else if(job.approve === 'reject'){
                    res.json('admin in not approved')
                }
                else{
                    res.json('wait for admin approval')
                }
            }else{
                res.json('you enter email is not registered')
            }
        }
        else if(emp){
            console.log(emp)
            const validPassword = await bcrypt.compare(password,emp.c_password)
            // console.log(password)
            if(validPassword === true){
                // console.log('hii')
                // check admin is give approved or not
                if(emp.approve === 'approve'){
                    res.json('employer')
                }
                else if(job.approve === 'reject'){
                    res.json('admin in not approved')
                }
            }
           
            else{
                res.json('wait for admin approval')
            }
        }
        else if(admin){
            console.log(admin)
            if(admin.a_password === password){
                res.json('admin')
            }
        }
        else{
            res.json('not found plz register first')
        }
    } catch (error) {
        res.status(400).json('error')
    }
})

module.exports = router