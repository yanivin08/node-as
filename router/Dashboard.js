let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth');
let Orders = require('../models/orders');

//this will extract all the data from the database
router.get('/',auth, (req,res) => {
    Orders.find({})
        .then(ord =>{
            res.send(ord)
        })
        .catch(err =>{
            res.send(`Error: ${err}`);
        })
})

module.exports = router;