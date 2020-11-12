let express = require('express');
let router = express.Router();

router.get('/',(req,res) => {
    res.send('Sample lang toh!');
})


module.exports = router;