const {Server} = require('socket.io')

const initSocket=(server)=>{
    const io = new Server(server,{
        cors : {
            'origin' : process.env.NODE_ENV === 'production' ? 'https://amaderdoctor.vercel.app' : 'http://localhost:3000'
        }
    })

    io.on('connection',(socket)=>{
        // console.log(`user connected ${socket.id}`)
        socket.on('join_chat',data=>{
            socket.join(data.id)
            console.log(data.id)
        })
    })
}

module.exports = initSocket