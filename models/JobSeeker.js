const mongoose = require('mongoose')
const JobSeekerSchema = new mongoose.Schema({
    j_name:{
        type:String,
        required:true,
    },
    j_number:{
        type:Number,
        required:true,
    },
    j_email:{
        type:String,
        required:true
    },
    j_address:{
        type:String,
        required:true,
    },
    j_password:{
        type:String,
        required:true
    },
    approve:{
        type:String
    }
})

const JobSeeker = mongoose.model('seeker',JobSeekerSchema)
module.exports = JobSeeker