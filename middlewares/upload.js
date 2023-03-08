const multer = require('multer')

const userStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/image/users')
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-')
        cb(null,fileName)
    }
})

const hospitalStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/image/hospitals')
    },
    filename:(req,file,cb)=>{
        const fileName = Date.now()+file.originalname.toLowerCase().split(' ').join('-')
        cb(null,fileName)
    }
})

exports.uploadUser = multer({
    storage: userStorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Invalid file type. Only jpg.jepg and png are allowed.'));
        }
    }
})



exports.uploadHospital = multer({
    storage: hospitalStorage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype==='image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
            cb(null,true)
        }else{
            cb(null,false)
            return cb(new Error('Invalid file type. Only jpg.jepg and png are allowed.'));
        }
    }
})