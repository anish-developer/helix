const express = require('express')
const router = express.Router()
const multer  = require('multer')
const AddJob = require('./models/AddJob')
const path = require('path')
// const JobApply = require('./models/JobApply')
const ApplyJob = require('./models/JobApply')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null,new Date().getTime() + file.originalname);
    },
  });
  // Multer Filter
  const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "pdf") {
      cb(null, true);
    } else {
      cb(new Error("Not a PDF File!!"), false);
    }
  };
  const upload = multer({ storage: storage,fileFilter: multerFilter});
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
    const c_type = req.body.c_type
    const date = new Date().toString()
    const updateDate = date.slice(8,16)
    // console.log(updateDate)
    // const sliceTrim = updateDate.slice(0,10)
    // console.log(sliceTrim)
    try {
        
           const newAddJob = new AddJob({
            c_type:c_type,
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
            jobaddress:jobAddress,
            date:updateDate
           })
        //    save in db
           const addNewJob = await newAddJob.save()
           console.log(addNewJob)
           res.status(201).json('job is saved && and waiting for admin approve')
    
        
    } catch (error) {
        res.status(400).json('error')
    }
})

// edit job by employers
router.patch('/editjob/:_id',upload.none(),async (req,res)=>{
    const id = req.params._id
    const c_type = req.body.c_type
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
    const date = new Date().toString()
    const updateDate = date.slice(8,16)
    // console.log(updateDate.slice(0,10))
    try {
        if(id){
           const data = await AddJob.updateOne(
            {_id:id},
            {
            $set:{companyname:companyname,
            empemail: empEmail,
            c_type:c_type,
            jobtitle:jobTitle,
            jobdesc:jobDesc,
            numofopen:numOfOpen,
            addskill:addSkill,
            salarydet:salaryDet,
            exp:exp,
            location:location,
            jobtime:jobTime,
            jobaddress:jobAddress,
            date:updateDate
            }
           })
           res.status(201).json('job is updated')
        }
        else {
            res.json('something wrong plz try after sometime')
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

// find job with email 
router.post('/spec/email/:email?',upload.none(),async (req,res)=>{
    try {
        const email = req.params.email
        if(email){
            const findJob = await AddJob.find({
                empemail:email
            })
            res.status(201).json(findJob)
        }else{
            res.status(400).json('invalid email')
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
            // console.log(jobs)
            res.status(201).json('reject')
        }else{
            res.status(400).json('invalid id')
        }
    } catch (error) {
        res.status(400).json(error)
    }
})

// show approved job
router.get('/show/approve',upload.none(),async(req,res)=>{
    try {
        const jobs = await AddJob.find({
            approve:'approve'
        })
        res.status(201).json(jobs)
    } catch (error) {
        res.status(400).json(error)
    }
})



// apply for job
router.post('/applyjob',upload.single('resume'),async (req,res)=>{
    try {
        const name = req.body.name
        if(name){
            const newApplyJob = await new ApplyJob({
                jobid:req.body._id,
                name : req.body.name,
                email : req.body.email,
                message : req.body.message,
                resume : req.file.filename
            })
            const data = await newApplyJob.save()
            console.log(data)
            res.status(201).json('job apply successfully')
        }
        else{
            res.status(401).json('plz upload pdf file')
        }
    } catch (error) {
        res.status(401).json(error,'something wrong')
    }
})

// show job Appliers
router.get('/show/appliers',upload.none(),async (req,res)=>{
    try {
        const data = await ApplyJob.find()
        // console.log(data)
        res.status(201).json(data)
    } catch (error) {
        res.status(401).json('something wrong')
    }
})

// find by id appliers
router.get('/find/appliers/:_id',upload.none(),async(req,res)=>{
    try {
        const id= req.params._id
        if(id){
            const data = await ApplyJob.findOne({
                _id:id
            })
            res.status(201).json(data)
        }else{
            res.status(401).json('invalid id')
        }
    } catch (error) {
        res.status(401).json('something wrong')
    }
})

// approve job Appliers
router.patch('/approve/appliers/:_id',upload.none(),async (req,res)=>{
    try {
        const id = req.params._id
        if(id){
            const jobsApprove = await ApplyJob.updateOne(
                {_id:id},
                {
                    $set:{status:'approve'}
                }
            )
            console.log(jobsApprove)
            res.status(201).json('approved')
        }else{
            res.status(401).json('invalid id')
        }
    } catch (error) {
        res.status(401).json('something wrong')
    }
})

// reject job Appliers
router.patch('/reject/appliers/:_id',upload.none(),async (req,res)=>{
    try {
        const id = req.params._id
        if(id){
            const jobsReject = await ApplyJob.updateOne(
                {_id:id},
                {
                    $set:{status:'reject'}
                }
            )
            console.log(jobsReject)
            res.status(201).json('rejected')
        }else{
            res.status(401).json('invalid id')
        }
    } catch (error) {
        res.status(401).json('something wrong')
    }
})


// job search by location and company type
router.patch('/search/job',upload.none(),async (req,res)=>{
    try {
        const location = req.body.location
        const type = req.body.c_type
        // if(location)
    } catch (error) {
        res.status(401).json('something wrong')
    }
})

// get resume 
router.get('/resume/:_id',upload.none(),async (req,res)=>{
    const id = req.params._id
    try {
        if(id){
            const data = await ApplyJob.findOne({
                _id:id
            })
            console.log(data.resume)
            res.sendFile(`/${data.resume}`,{root:path.join(__dirname,'./uploads')})
        }else{
            res.json('something wrong')
        }
    } catch (error) {
        res.status(401).json('this is error')
    }
})

// filter with job or company name and country or company type
router.patch('/filter/jobs',upload.none(),async (req,res)=>{
    const jobtitle = req.body.jobtitle
        const companyName = req.body.companyname
        const location = req.body.location
        const c_type = req.body.c_type
        const exp = req.body.exp
        const jobtime = req.body.jobtime
    try {
        if(jobtitle && location && c_type){
            const data = await AddJob.find({
                $or:[{jobtitle:jobtitle},{companyname:jobtitle}],location:location,c_type:c_type
        })
            console.log(data)
            res.status(201).json(data)
        }
        
        else if(!jobtitle && !location && !c_type){
            const jobs = await AddJob.find({
                approve:'approve'
            })
            console.log(jobs)
            res.status(201).json(jobs)
        }
    } catch (error) {
        res.status(401).send(error,'this is error')
    }
})

module.exports = router