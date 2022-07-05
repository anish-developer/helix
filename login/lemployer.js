// const express = require('express')
// const router = express.Router()
// const Employer = require('../models/Employer')
// const multer  = require('multer')
// const bcrypt = require('bcrypt')


// const upload = multer()

// router.post('/lemployer',upload.none(),async(req,res)=>{
//     // res.send('hii')
//     try {
//         const email = req.body.email
//         const password =req.body.password
//         let data = await Employer.findOne({c_email:email})
//         if(data){

//             // check if incoming password is the same the db password
//         const validPassword = await bcrypt.compare(password,data.c_password)

//         console.log(validPassword)
//            if(validPassword === true){
//             // res.json(data.approve)

//             // check admin approved or not
            
//             if(data.approve === "approve"){
//                 res.status(201).json(true)
//             }
//             else{
//                 res.status(201).json('admin is not approved')
//             }
//            }
//            else{
//             res.json('password is wrong')
//            }
//         }else{
//             res.json(false)
//         }
//     } catch (error) {
//         res.status(400).json(error)
//     }
// })


// module.exports = router