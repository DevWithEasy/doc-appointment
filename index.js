require("dotenv").config()
const path = require('path')
const express = require('express');
const app = express();
const applyRoute = require('./routers/routes')
const applyMidleware = require('./middlewares/midlewares');
const dbConnection = require("./config/dbConnection");

//all midlewares apply
applyMidleware(app)

//all routes apply
applyRoute(app)

//connect database
dbConnection()

//app server initialzed
app.use(express.static(path.join(__dirname,'./client/build')))
app.use(express.static('public'))

//app server initialzed
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

app.listen(process.env.PORT || 8080,()=>{
    console.log('Express server listening on port 8080')
})