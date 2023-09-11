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
        })

        socket.on('create_appointment',data=>{
            socket.to(data.doctor).emit('create_appointment_notifiaction',data.notification)
        })

        socket.on('action_appointment',data=>{
            socket.to(data.user).emit('action_appointment_recieved',data.notification)
        })
    })
}

module.exports = initSocket