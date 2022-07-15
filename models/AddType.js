const mongoose = require('mongoose')

const AddTypeSchema = new mongoose.Schema({
    c_type:{
        type:String,
        required:true,
        unique:true
    }
})

const AddType= mongoose.model('companytype',AddTypeSchema)
module.exports = AddType