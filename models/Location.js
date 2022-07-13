const mongoose = require('mongoose')

const LocationSchema = new mongoose.Schema({
    location:{
        type:String,
        required:true,
        unique:true
    }
})

const Location = mongoose.model('location',LocationSchema)
module.exports = Location