const express = require('express')
const router = express.Router()
const multer  = require('multer')
const AddJob = require('./models/AddJob')

const upload = multer()

// add job
router.post('/addjob',upload.none(),async (req,res)=>{
    const companyname = req.body.companyname
    const empEmail = req.body.email
    const jobTitle = req.body.jobtitle
    const jobDesc =req.body.jobdesc
    const numOfOpen = req.body.numofopen
    const addSkill = req.body.addskill
    const salaryDet = req.body.salarydet
    const exp = req.body.exp
    const location = req.body.location
    const jobTime = req.body.jobtime
    const jobAddress = req.body.jobaddress
    try {
        if(jobTitle && jobDesc && numOfOpen &&addSkill && salaryDet && exp && location && jobTime && jobAddress && empEmail){
           const newAddJob = new AddJob({
            companyname:companyname,
            empemail: empEmail,
            jobtitle:jobTitle,
            jobdesc:jobDesc,
            numofopen:numOfOpen,
            addskill:addSkill,
            salarydet:salaryDet,
            exp:exp,
            location:location,
            jobtime:jobTime,
            jobaddress:jobAddress
           })
        //    save in db
           const addNewJob = newAddJob.save()
           res.status(201).json('job is saved')
        }
        else {
            res.json('require all field')
        }
        
    } catch (error) {
        res.status(400).json(error)
    }
})


// get job
router.get('/showjobs',upload.none(),async (req,res)=>{
    try {
        const jobs = await AddJob.find()
        res.status(200).json(jobs)
    } catch (error) {
        res.status(400).json(error)
    }
})

// specific job
router.patch('/spec/jobs/:_id?',upload.none(), async(req,res)=>{
    try {
        const id = req.params._id
        if(id){
            const jobs = await AddJob.findOne({
                _id:id
            })
            res.status(201).json(jobs)
        }else{
             res.status(400).json('invalid id')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// approve job
router.patch('/approve/job/:_id?',upload.none(),async (req,res)=>{
    try {
        const id = req.params._id
        if(id){
            const jobs = await AddJob.updateOne(
                {_id:id},
                {
                    $set:{approve:"approve"}
                }
            )
            console.log(jobs)
            res.status(201).json('approved')
        }else{
            res.status(400).json('invalid id')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// reject job
router.patch('/reject/job/:_id?',upload.none(),async (req,res)=>{
    try {
        const id = req.params._id
        if(id){
            const jobs = await AddJob.updateOne(
                {_id:id},
                {
                    $set:{approve:'reject'}
                }
            )
            console.log(jobs)
            res.status(201).json('reject')
        }else{
            res.status(400).json('invalid id')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router