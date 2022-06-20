const mongoose = require('mongoose')

const ContactFormSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }
})

const ContactForm = mongoose.model('contactform',ContactFormSchema)

module.exports = ContactForm