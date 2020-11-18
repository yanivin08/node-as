let express = require('express');
let router = express.Router();
let Orders = require('../models/orders');

router.get('/',(req,res) => {
    Orders.find({})
        .then(ord =>{
            res.send(ord)
        })
        .catch(err =>{
            res.send(`Error: ${err}`);
        })
})

module.exports = router;