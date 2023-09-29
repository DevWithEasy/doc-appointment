const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')

const middlewares = [
    express.urlencoded({ extended: false }),
    express.json(),
    cors(),
    morgan('dev'),
    express.static(path.join(__dirname,'./client/dist')),
    express.static('public')
]

const applyMidleware = (app) =>{
    middlewares.map(m=>app.use(m))
}
module.exports = applyMidleware