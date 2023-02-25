const mongoose = require('mongoose')

const dbConnection = ()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.URI,{useNewUrlParser: true})
        .then(res=>console.log('Connected to database'))
        .catch(err => console.log('Failed to connect to database'))
}

module.exports = dbConnection