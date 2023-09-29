const {Server} = require('socket.io')
const app = require('express')()
const http = require('http')

const server = http.createServer(app)

const getSocket=()=>{
    let socket
    const io = new Server(server,{
        cors : {
            'origin' : process.env.NODE_ENV === 'production' ? 'https://amaderdoctor.vercel.app' : 'http://localhost:3000/'
        }
    })
    io.on('connection',socket=>{
        socket = socket
        console.log(socket.io)
    })
    
    return socket

}

module.exports = getSocket