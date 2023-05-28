const authRouter = require('./authRouter')
const doctorRouter = require('./doctorRouter')
const appointmentRouter = require('./appointmentRouter')
const adminRouter = require('./adminRouter')
const hospitalRouter = require('./hospitalRouter')
const transectionRouter = require('./transectionRouter')
const routers = [
    {
        path : '/api/auth',
        handler : authRouter
    },
    {
        path : '/api/doctor',
        handler : doctorRouter
    },
    {
        path : '/api/hospital',
        handler : hospitalRouter
    },
    {
        path : '/api/appointment',
        handler : appointmentRouter
    },
    {
        path : '/api/admin',
        handler : adminRouter
    },
    {
        path : '/api/transection',
        handler : transectionRouter
    },
    // {
    //     path : '/',
    //     handler : (req,res) =>{
    //         res.send('Server is ready!');
    //     }
    // }
]

const applyRouter = (app) =>{
    routers.map(r=>{
        if(r.path === '/'){
            app.get(r.path,r.handler)
        }else{
            app.use(r.path,r.handler)
        }
    })
}

module.exports = applyRouter