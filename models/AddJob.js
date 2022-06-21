const mongoose = require('mongoose')
const AddJobScheme = new mongoose.Schema({
    empemail:{
        type:String,
        required:true
    },
    jobtitle:{
        type:String,
        required:true
    },
    jobdesc:{
        type:String,
        required:true
    },
    numofopen:{
        type:Number,
        required:true
    },
    addskill:{
        type:String,
        required:true
    },
    salarydet:{
        type:String,
        required:true
    },
    exp:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobtime:{
        type:String,
        required:true
    },
    jobaddress:{
        type:String,
        required:true
    }
})
const AddJob = mongoose.model('addjob',AddJobScheme)
module.exports = AddJob