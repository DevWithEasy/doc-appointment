const authRouter = require('./authRouter')
const doctorRouter = require('./doctorRouter')
const appointmentRouter = require('./appointmentRouter')
const adminRouter = require('./adminRouter')
const vanueRouter = require('./vanueRouter')
const transectionRouter = require('./transectionRouter')
const specialistRouter = require('./SpecialistRouter')
const chamberRouter = require('./chamberRouter')

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
        path : '/api/chamber',
        handler : chamberRouter
    },
    {
        path : '/api/vanue',
        handler : vanueRouter
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
    {
        path : '/api/specialist',
        handler : specialistRouter
    },
    // {
    //     path : '/',
    //     handler : (req,res) =>{
    //         res.json({
    //             status : 200,
    //             success : true,
    //             message : 'Server successfully running...'
    //         })
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