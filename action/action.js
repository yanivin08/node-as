let Orders = require('../models/orders');
let App = require('../models/app')

exports.getActive = (data) => {
    Orders.find({status: 'New Appointment'})
        .then(ord => {
            if(ord){
                return(ord);
            }else{
                return(`No active appointments!`);
            }
        }) 
        .catch(err => {
            return(`Error in extracting active appointments! : ${err}`)
        })
}

exports.getConfirm = (data) => {
    Orders.find({status: 'Confirm Appointment'})
        .then(ord => {
            if(ord){
                return(ord);
            }else{
                return(`No active appointments!`);
            }
        }) 
        .catch(err => {
            return(`Error in extracting active appointments! : ${err}`)
        })
}

exports.changeDate = (data) => {
    Orders.findOneAndUpdate({order: data.order},
        {
            appt_start: data.appt_start,
            appt_end: data.appt_end
        }
    )
    .then(() => {
        return(`Appointment date has been updated for order no. ${data.order}`)
    })
    .catch(err => {
        return(`Error in order no. ${data.order}: ${err}`)
    })
}


exports.changeStatus = (data) => {
    Orders.findOneAndUpdate({order: data.order},
        {
            status: data.status
        }
    )
    .then(() => {
        return(`Status has been updated for order no. ${data.order}`)
    })
    .catch(err =>{
        return(`Error in order no. ${data.order}: ${err}`)
    })

}

exports.addOrders = (ord) => {

    let results = [];

    ord.forEach(i => {
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
    
    return(results);

}