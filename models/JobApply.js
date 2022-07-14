const mongoose = require('mongoose')

const JobApplySchema = new mongoose.Schema({
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
        type:String
    }
})

 
 const JobApply = mongoose.model('jobApply',JobApplySchema)
 module.exports = JobApply