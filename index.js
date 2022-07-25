const express = require('express')
const cors = require('cors')



require('./db.js')
// const upload = multer()
const app = express()


// middleware

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))
// for parsing multipart/form-data
// app.use(upload.array()); 
app.use(cors())
app.use("/uploads", express.static('uploads'))

app.use(express.static(path.join(__dirname, 'helix')));

app.get('/*', function(req,res) {
		res.sendFile(path.join(__dirname, 'helix', 'index.html'));
});

// register
app.use('/helix/register',require('./sign/employer'))
app.use('/helix/register',require('./sign/jobseeker'))

// login
app.use('/helix/login',require('./login/login'))

// login
app.use('/helix/login',require('./login/lemployer'))
app.use('/helix/login',require('./login/lJobSeeker'))

// admin
app.use('/helix/admin',require('./admin/admin'))

// contactform
app.use('/helix/contactform',require('./contactForm'))

// job add or see
app.use('/helix/job',require('./job'))

app.get('/',(req,res)=>{
    res.send('hii')
})

const port =process.env.PORT || '5000'
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})