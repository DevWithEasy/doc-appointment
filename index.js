require("dotenv").config()
const path = require('path')
const http = require('http')
const express = require('express');
const app = express();
const applyRoute = require('./routers/routes')
const applyMidleware = require('./middlewares/midlewares');
const dbConnection = require("./config/dbConnection");
const sheduleTask = require("./utils/sheduleTask");
const { api_url, ui_url } = require("./utils/baseUrl");
const initSocket = require("./config/socket");

//create http server
const server = http.createServer(app)

//all midlewares apply
applyMidleware(app)

//all routes apply
applyRoute(app)

//connect database
dbConnection()

//socket initialize
initSocket(server)

//app server initialzed
// app.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./client/build/index.html'))
// })
const root = require('path').join(__dirname, 'client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})


sheduleTask()

server.listen(process.env.PORT || 8080,()=>{
    console.log('Express server listening on port 8080')
})