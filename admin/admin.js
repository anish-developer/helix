const express = require('express')
const router = express.Router()
const Admin = require('../models/Admin')
const multer = require('multer')
const Employer = require('../models/Employer')
const JobSeeker = require('../models/JobSeeker')
const Location = require('../models/Location')

// middleware
const upload = multer()

// login
router.post('/login',upload.none(), async (req,res)=>{
    // console.log(req.body.a_email)
    // console.log(req.body.a_password)
    // res.send('hii')
    const email = req.body.email
    const password = req.body.password
    console.log(email,password)
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

// specific employer data
router.get('/specemployer/:_id?',upload.none(),async (req,res)=>{
    try {
        // res.send('hii')
        const id = req.params._id
        const data = await Employer.findOne({
            _id:id
        })
        // res.json(d0ata[0].c_name)
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json('invalid id')
    }
})

// specific JobSeeker data
router.get('/specjobseeker/:_id?',upload.none(),async (req,res)=>{
    try {
        const id = req.params._id
        const data = await JobSeeker.findOne({
            _id:id
        })
        res.status(201).json(data)
    } catch (error) {
        res.status(400).json('invalid id')
    }
})

// all employers
router.get('/employer',upload.none(),async (req,res)=>{
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
router.patch('/approve/employers/:_id?', async (req,res)=>{

    try {
        const id = req.params._id
        let data = await Employer.updateOne(
            // {}condition
    //{ $set updated data}
            {_id:id},{
                $set: {approve:"approve"}
            }
        )
        console.log(data)
        res.status(201).json('approved')
    } catch (error) {
        res.status(400).json('invalid id')
    }
})

// approve JobSeeker
router.patch('/approve/jobseeker/:_id?',async (req,res)=>{
    try {
        const id = req.params._id
        const data = await JobSeeker.updateOne(
            {_id:id},
            {
                $set: {approve:"approve"}
            }
        )
        res.status(201).json('approved')
    } catch (error) {
        res.status(400).json('invalid id')
    }
})

// reject employers
router.patch('/reject/employers/:_id?',async (req,res)=>{
    try {
        const id = req.params._id
        // console.log(id)
        let data = await Employer.updateOne(
            {_id:id},
            {
             $set:{approve:'reject'}
            }
        )
        console.log(data)
        res.status(201).json('rejected')
    } catch (error) {
        res.status(400).json('invalid id')
    }
})

// reject JobSeeker
router.patch('/reject/jobseeker/:_id?', async (req,res)=>{
    try {
        const id  = req.params._id
        const data = await JobSeeker.updateOne(
            {_id:id},
            {
                $set: {approve:'reject'}
            }
        )
        console.log(data)
        res.status(201).json('rejected')
    } catch (error) {
        res.status(400).json('invalid id')
    }
})

// edit employers
router.patch('/edit/employer/:_id?',upload.none(),async (req,res)=>{
    try {
        const id = req.params._id
        const name= req.body.c_name
        const address= req.body.c_address
        const person= req.body.c_person
        const number= req.body.c_number
        const email= req.body.c_email
        const description= req.body.c_description
        // console.log(email,name,address,person,number,description)
        if(id){
            const data = await Employer.updateOne(
                {_id:id},
                {
                    $set:{
                        c_name:name,
                        c_address:address,
                        c_person:person,
                        c_number:number,
                        c_email:email,
                        c_description:description
                    }
                }
            )
            res.status(201).json(data.acknowledged)
        }
        else{
            res.status(400).json('plz provide id')
        }
    } catch (error) {
        res.status(400).json('invalid id')
    }
})


// edit JobSeeker
router.patch('/edit/jobseeker/:_id?',upload.none(),async (req,res)=>{
    try {
        const id = req.params._id
        // console.log(id)
        const name= req.body.j_name
        const number= req.body.j_number
        const email= req.body.j_email
        const address= req.body.j_address
        // console.log(name,number,email,address)
        const data = await JobSeeker.updateOne(
            {_id:id},
            {
                $set:{
                    j_name:name,
                    j_number:number,
                    j_email:email,
                    j_address:address
                }
            }
        )
            res.status(201).json(data.acknowledged)
    } catch (error) {
        res.status(400).json("invalid id")
    }
})


//add location or country 
router.post('/location/add',upload.none(),async (req,res)=>{
    try {
        const location = req.body.location
        // console.log(location)
        // if
        if(location){
            const data = new Location({
                location:location
            })
            const addLocation = await data.save()
            // console.log(addLocation)
            res.status(201).json('location save successfully')
        }
        else{
            res.status(400).json('plz enter location')
        }
    } catch (error) {
        res.status(400).json('something wrong')
    }
})


module.exports = router