const mongoose = require('mongoose')

const JobApplySchema = new mongoose.Schema({
    jobid:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    message:{
        type:String
    },
    resume:{
        type:String,
        required:true
    },
    status:{
        type:String
    }
})

 
 const JobApply = mongoose.model('jobApply',JobApplySchema)
 module.exports = JobApply