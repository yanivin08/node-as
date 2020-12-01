let express = require('express');
let router = express.Router();
let Orders = require('../models/orders');
let jwt = require('jsonwebtoken');
let auth = require('../middleware/auth');
const { route } = require('./Dashboard');

//get all active appointments
router.get('/active', auth, (req,res) => {
    Orders.find({status: 'New Appointment'})
        .then(ord => {
            if(ord){
                res.send(ord);
            }else{
                res.send(`No active appointments!`);
            }
        }) 
        .catch(err => {
            res.send(`Error in extracting active appointments! : ${err}`)
        })
})

//change appointment status for particular order
router.post('/status', auth, (req,res) => {
    Orders.findOneAndUpdate({order: req.body.order},
            {
                status: req.body.status
            }
        )
        .then(() => {
            res.send(`Status has been updated for order no. ${req.body.order}`)
        })
        .catch(err =>{
            res.send(`Error in order no. ${req.body.order}: ${err}`)
        })
});

//change appointment date for particular order
router.post('/date', auth, (req,res) => {
    Orders.findOneAndUpdate({order: req.body.order},
            {
                appt_start: req.body.appt_start,
                appt_end: req.body.appt_end
            }
        )
        .then(() => {
            res.send(`Appointment date has been updated for order no. ${req.body.order}`)
        })
        .catch(err => {
            res.send(`Error in order no. ${req.body.order}: ${err}`)
        })
})

//add all extracted orders from our web extensions to our database
router.post('/add', auth, (req,res) => {
    console.log(req.body);
    const orders = req.body;
    let results = [];
    console.log(orders)
    orders.forEach(i => {
        const { order, appt_start, appt_end, vendor, reference, appt_type } = i;
        
        let result = [];

        if( !order || !appt_start || !appt_end || !vendor || !reference || !appt_type){
            result.push({ msg: 'Incomplete data!' });
        }

        if(result.length > 0){
            results.push({ order: order, msg: result})
        }else{
            Orders.findOne({ order: order })
                .then(ord => {
                    //order already exist
                    if(ord){
                        result.push({ msg: 'This order already exist!'})
                        results.push({ order: order, msg: result})
                    }else{
                        
                        let newOrder = new Orders({
                            order,
                            appt_start,
                            appt_end,
                            vendor,
                            reference,
                            appt_type
                        })
                        console.log(newOrder)
                        newOrder.save()
                            .then(ord => {
                                result.push({ msg: 'Order has successfully saved!'})
                                results.push({ order: order, msg: result})
                                console.log("successful!")
                            })
                            .catch(err => {
                                result.push({ msg: err })
                                results.push({ order: order, msg: result})
                            })
                    }
                })
        }
    });
    console.log(results)
    res.send(results)
});



module.exports = router;