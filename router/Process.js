let express = require('express');
let router = express.Router();
let { spawn } = require('child_process');


router.get('/appointments',(req,res) => {
    
})

//this is to run python program to upload the file to COMs
router.post('/upload',(req,res) => {
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

module.exports = router;