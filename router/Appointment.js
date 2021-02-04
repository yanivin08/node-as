let express = require('express');
let router = express.Router();
let Orders = require('../models/orders');
let jwt = require('jsonwebtoken');
let auth = require('../middleware/auth');
let { addOrders, changeStatus, changeDate, getActive, getConfirm } = require('../action/action');

//get all active appointments
router.get('/active', auth, (req,res) => {
    res.send(getActive());
})

//get all confirm appointments
router.get('/confirm', auth, (req,res) => {
    res.send(getConfirm());
})

//change appointment status for particular order
router.post('/status', auth, (req,res) => {
    res.send(changeStatus(req.body));
});

//change appointment date for particular order
router.post('/date', auth, (req,res) => {
    res.send(changeDate(req.body));
})

//add all extracted orders from our web extensions to our database
router.post('/add', auth, (req,res) => {
    res.send(addOrders(req.body));
});

module.exports = router;