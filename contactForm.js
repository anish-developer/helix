const express = require('express')
const router = express.Router()
const multer = require('multer')
const ContactForm = require('./models/ContactForm')

// middleware
const upload = multer()

router.post('/form',upload.none(),async (req,res)=>{
    // console.log(req.body)
    try {
        const newContactForm = new ContactForm({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            subject:req.body.subject,
            message:req.body.message,
        })
        // save in db
        const contactform = await newContactForm.save()
        res.status(201).json('send successfully')
        console.log(contactform)
    } catch (error) {
        res.status(400).json(error)
    }

})

router.get('/form',upload.none(),async (req,res)=>{
    // console.log('hii')
    try {
        const data = await ContactForm.find()
        res.json(data)
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router