const {Server} = require('socket.io')

const initSocket=(server)=>{
    const io = new Server(server,{
        cors : {
            'origin' : process.env.NODE_ENV === 'production' ? 'https://amaderdoctor.onrender.com' : 'http://localhost:3000'
        }
    })

    io.on('connection',(socket)=>{
        socket.on('join',data=>{
            socket.join(data.id)
        })

        socket.on('create_appointment',notification=>{
            socket.to(notification.user).emit('create_appointment_notification',notification)
            console.log(notification)
        })

        socket.on('action_appointment',notifiaction=>{
            socket.to(notifiaction.user).emit('action_appointment_recieved',data.notifiaction)
        })
    })
}

module.exports = initSocket