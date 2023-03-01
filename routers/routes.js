const authRouter = require('./authRouter')
const doctorRouter = require('./doctorRoute')
const appointmentRouter = require('./appointmentRoute')
const adminRouter = require('./adminRoute')
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
        path : '/api/appointment',
        handler : appointmentRouter
    },
    {
        path : '/api/admin',
        handler : adminRouter
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