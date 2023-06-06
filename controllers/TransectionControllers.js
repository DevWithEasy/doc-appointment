const Transection = require("../models/Transection")
const SSLCommerzPayment = require('sslcommerz-lts')
const {ObjectId} = require('mongoose').Types


exports.initPayment=async(req,res,next)=>{
    const store_id = process.env.STORE_ID
        const store_passwd = process.env.STORE_SECRET_KEY
        const is_live = false

        const data = {
            total_amount: req.body.amount,
            currency: 'BDT',
            tran_id: 'REF123', // use unique tran_id for each api call
            success_url: 'http://localhost:3030/success',
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            product_name: 'Computer.',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: 'Customer Name',
            cus_email: 'customer@example.com',
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: '01711111111',
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: 'Dhaka',
            ship_add2: 'Dhaka',
            ship_city: 'Dhaka',
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
    try {

        // const newTransection = new Transection({
        //     ...req.body,
        //     user : req.body.userId
        // })

        // await newTransection.save()

        // res.status(200).json({
        //     status : 200,
        //     success : true,
        //     message : 'Request sent successfully'
        // })
    } catch (error) {
        res.status(500).json({
            status : 500,
            success : false,
            message : error.message
        })
    }
}