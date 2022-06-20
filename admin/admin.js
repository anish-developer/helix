const express = require('express')
const router = express.Router()
const Admin = require('../models/Admin')
const multer = require('multer')
const Employer = require('../models/Employer')
const JobSeeker = require('../models/JobSeeker')

// middleware
const upload = multer()

// login
router.post('/login',upload.none(), async (req,res)=>{
    // console.log(req.body.a_email)
    // console.log(req.body.a_password)
    // res.send('hii')
    const email = req.body.a_email
    const password = req.body.a_password
    try {
        const data = await Admin.findOne({a_email: email})
        // console.log(data)

        if(data.a_password === password){
            res.json(true)
        }
        else{
            res.json(false)
        }
    } catch (error) {
        res.status(400).json('invalid login details')
    }
})


// all employers
router.get('/employer',async (req,res)=>{
    try {
        // res.send('hii')
        const data = await Employer.find()
        // res.json(d0ata[0].c_name)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})

// all JobSeeker
router.get('/jobseeker',async(req,res)=>{
    try {
        const data = await JobSeeker.find()
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})

// approve employers
router.patch('/approve/employers/:_id', async (req,res)=>{
    try {
        const id = req.params._id
        let data = await Employer.updateOne(
            // {}condition
    //{ $set updated data}
            {_id:id},{
                $set: {approve:true}
            }
        )
        res.status(201).json(true)
    } catch (error) {
        res.status(400).json('invalid id')
    }
})

// approve JobSeeker
router.patch('/approve/jobseeker/:_id',async (req,res)=>{
    try {
        const id = req.params._id
        const data = await JobSeeker.updateOne(
            {_id:id},
            {
                $set: {approve:true}
            }
        )
    } catch (error) {
        res.status(400).json('invalid id')
    }
})
module.exports = router