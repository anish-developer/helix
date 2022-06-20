const mongoose =  require("mongoose");
const EmployerSchema = new mongoose.Schema({
    c_name :{
        type:String,
        required:true,
    },
    c_logo :{
        data: String,
        contentType: String
    },
    c_address:{
        type:String,
        required:true},
    c_person:{
        type:String,
        required:true},
    c_number:{
        type:Number,
        required:true,
        unique:true
    },
    c_email:{
        type:String,
        required:true,
        unique:true
    },
    c_description:{
        type:String,
        required:true
    },
    c_password:{
        type:String,
        required:true
    },
    approve:{
        type:Boolean
    }
})  

const Employer = mongoose.model('employers',EmployerSchema)
module.exports = Employer