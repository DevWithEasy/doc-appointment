require("dotenv").config()
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

app.listen(process.env.PORT || 8080,()=>{
    console.log('Express server listening on port 8080')
})