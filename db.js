
const mongoose = require('mongoose')
require ('dotenv/config')
// const username = 'anish'
// const password = 1234
// const cluster = "Cluster0"
// const dbName = 'helix'
// mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.ojhq1.mongodb.net/${dbName}?retryWrites=true&w=majority`)

mongoose.connect('mongodb+srv://anish:1234@Cluster0.ojhq1.mongodb.net/helix?retryWrites=true&w=majority',
    {}, err => {
        console.log('connected')
        // console.log(err)
    });