const Transection = require("../models/Transection")
const SSLCommerzPayment = require('sslcommerz-lts')
const User = require("../models/User")
const { api_url, ui_url } = require("../utils/baseUrl")
const {ObjectId} = require('mongoose').Types


exports.initPayment=async(req,res,next)=>{
    const store_id = process.env.STORE_ID
    const store_passwd = process.env.STORE_SECRET_KEY
    const is_live = false
        
    try {

        const tnxID = new ObjectId().toString();

        const user = await User.findOne({_id : req.body.userId})

        const data = {
                total_amount: req.body.amount,
                currency: 'BDT',
                tran_id: tnxID,
                success_url: `${api_url}/api/transection/success/${tnxID}`,
                fail_url: `${api_url}/api/transection/failure/${tnxID}`,
                cancel_url: `${api_url}/api/transection/failure/${tnxID}`,
                ipn_url: `${api_url}/ipn`,
                shipping_method: 'Online',
                product_name: 'Add Balance order',
                product_category: 'payment',
                product_profile: 'general',
                cus_name: user.name,
                cus_email: user.email,
                cus_add1: user.address.location,
                cus_add2: '',
                cus_city: user.address.upazilla,
                cus_state: user.address.district,
                cus_postcode: user.address.post_code,
                cus_country: 'Bangladesh',
                cus_phone: user.phone,
                cus_fax: '',
                ship_name: user.name,
                ship_add1: user.address.location,
                ship_add2: '',
                ship_city: user.address.upazilla,
                ship_state: user.address.district,
                ship_postcode: user.address.post_code,
                ship_country: 'Bangladesh',
            };

            const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
            sslcz.init(data).then(apiResponse => {
                
                let GatewayPageURL = apiResponse.GatewayPageURL

                
                
                const newTransection = new Transection({
                    tnxID,
                    amount : req.body.amount,
                    user : req.body.userId
                })
        
                newTransection.save()
                
                
                res.status(200).json({
                    status : 200,
                    success : true,
                    url : GatewayPageURL,
                    message : 'Request sent successfully'    
                })
            });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.successPayment=async(req,res,next)=>{
    try {
        const transection = await Transection.findOne({tnxID:req.params.tnxID})

        await User.findByIdAndUpdate(transection.user,{
            $inc:{
                balance : transection.amount
            }
        })

        await Transection.findByIdAndUpdate(transection._id,{
            $set:{
                payment : true
            }
        })

        res.redirect(`${ui_url}/payment/success`)

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}

exports.failurePayment=async(req,res,next)=>{

    try {
        const data = await Transection.deleteOne({tnxID : req.params.tnxID})

        if(data.deletedCount === 1){
            res.redirect(`${ui_url}/payment/failure`)
        }else{
            return res.status(405).json({
                status : 405,
                success : false,
                message : 'Something went wrong'
            })
        }

    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}