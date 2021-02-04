let { changeStatus } = require('./action');
let App = require('../models/app');
let id = '601a8e00f2b57d4998ddafd2';


let checkProcess = () => {
    App.findById(id)
        .then(app => {
            return(app.start)
        })
        .catch(err => console.log(err))
}


exports.loopActive = (ord) => {
    ord.forEach(el => {
        if(checkProcess()){
            if(el.appt_type === "Website"){
                //set appointment in the third party website.
            }else if(el.appt_type === "Email"){
                //set appointment in via email.
            }
            changeStatus({order: el.order, status: "Set Appointment"})
            
            App.findByIdAndUpdate(id,{
                status: "Set",
                order: el.order,
                message: "Setting up appointments for all active orders"
            })
        }
    });
}

exports.loopConfirm = (ord) => {
    ord.forEach(el => {
        if(checkProcess()){
            //fetch ART and change date and change status on database as completed
            changeDate({order: el.order, status: "Complete Appointment"})

            App.findByIdAndUpdate(id,{
                status: "Complete",
                order: el.order,
                message: "Complete the appointment for all confirmed appointments"
            })
        }
    });
}