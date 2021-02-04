let express = require('express');
let router = express.Router();
let { spawn } = require('child_process');
let auth = require('../middleware/auth');
let App = require('../models/app')
let { addOrders, getActive, getConfirm } = require('../action/action');
let { loopActive, loopConfirm } = require('../action/process');
let id = '601a8e00f2b57d4998ddafd2';

//this is to run python program to upload the file to COMs
router.post('/upload',auth,(req,res) => {
    const childPython = spawn('python', ['.././python/upload.py']);

    childPython.stdout.on('data',(data) => {
        console.log(`Uploading email to COM for order ${req.body.order}`);
        res.send(`Upload successfully for order no. ${req.body.order}`);
    })

    childPython.stderr.on('err',(err) =>{
        console.error(`stderr: ${err}`);
        res.send(`Error uploading for order no. ${req.body.order}: ${err}`);
    })

    childPython.on('close',(code)=>{
        console.log(`child process exited with code ${code}`);
    })

})

router.get('/start',auth,async(req,res) => {
    App.findByIdAndUpdate(id,{
        start: true,
        status: "Extracting",
        message: "Extracting orders from Client Application"
    })
    
    await fetch('', {
        method: 'GET',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'x-auth-token': token
        }
    })
    .then(res => res.json())
    .then(res => {
        addOrders(res)
    })
    .catch((err) => {
        console.log(err)
    })

    let newOrder = getActive();
    let confirmOrder = getConfirm();

    await loopActive(newOrder);
    await loopConfirm(confirmOrder);

    App.findByIdAndUpdate(id,{
        start: false,
        status: "End",
        message: "Setting up appointment has been completed"
    })
})

module.exports = router;