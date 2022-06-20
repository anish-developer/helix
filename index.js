const express = require('express')
const cors = require('cors')



require('./db.js')
// const upload = multer()
const app = express()


// middleware

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended:false}))
// for parsing multipart/form-data
// app.use(upload.array()); 
app.use(cors())

// register
app.use('/helix/register',require('./sign/employer'))
app.use('/helix/register',require('./sign/jobseeker'))

// login
app.use('/helix/login',require('./login/lemployer'))
app.use('/helix/login',require('./login/lJobSeeker'))

// admin
app.use('/helix/admin',require('./admin/admin'))

// contactform
app.use('/helix/contactform',require('./contactForm'))

app.get('/',(req,res)=>{
    res.send('hii')
})

const port =process.env.PORT || '5000'
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})