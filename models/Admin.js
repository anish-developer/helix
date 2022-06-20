const mongoose = require('mongoose')
const AdminSchema = new mongoose.Schema({
    a_email:{
        type:String,
        required:true
    },
    a_password:{
        type:String,
        required:true
    },
})

const Admin = mongoose.model('admin',AdminSchema)
module.exports = Admin