import { GET_ITEMS_START, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from './type';

const getDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',day: '2-digit',year: 'numeric'});
}


const getItemStart = () => {
    return {
        type: GET_ITEMS_START
    }
}

const getItemSuccess = res => {
    console.log(res)
    if(res.msg){
        return { 
            type: GET_ITEMS_FAILED,
            payload: res.msg
        }
    }else{ 

        let webValue = res.filter(i => i.appt_type == "Website").length
        let mailValue = res.filter(i => i.appt_type == "Email").length
        let totalValue = res.length

        let webDesc = (webValue/totalValue * 100).toFixed(2);
        let mailDesc = (mailValue/totalValue * 100).toFixed(2);
        let emailGraph = {};
        let webGraph = {};

        res.filter(i => i.appt_type == "Website").forEach(e => webGraph[getDate(e.date_extracted)] = (webGraph[getDate(e.date_extracted)] || 0) + 1);
        res.filter(i => i.appt_type == "Email").forEach(e => emailGraph[getDate(e.date_extracted)] = (emailGraph[getDate(e.date_extracted)] || 0) + 1);

        let completed = res.filter(i => i.status == "Complete Appointment").length
        let cancelled = res.filter(i => i.status == "Cancelled Appointment").length
        let pending = res.filter(i => i.status == "New Appointment").length
        let confirmed = res.filter(i => i.status == "Set Appointment").length

        let stateHandler = {
            website: {
                value: webValue,
                description: webDesc + "% of the total Appointments"
            },
            email: {
                value: mailValue,
                description: mailDesc + "% of the total Appointments"
            },
            total: {
                value: totalValue,
                description: "Total number of appointment extracted"
            },
            lineGraph: {
                xaxis: Object.keys(emailGraph).length >= Object.keys(webGraph).length ? Object.keys(emailGraph) : Object.keys(webGraph),
                series: [
                    {
                        name: 'Email',
                        data: Object.values(emailGraph)
                    },
                    {
                        name: 'Website',
                        data: Object.values(webGraph)
                    }
                ]
            },
            pieGraph: {
                series: [completed, cancelled, pending, confirmed]
            }
        }

        return {
            type: GET_ITEMS_SUCCESS,
            payload: stateHandler
        }
    }
}

const getItemsFailed = err => {
    return {
        type: GET_ITEMS_FAILED,
        payload: err
    }
}

export const getItems = () => {

    return (dispatch) => {
        dispatch(getItemStart());
        fetch('/dashboard', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjUyZDdiYzVjMzVmNDFlMDZjYjIxOCIsImlhdCI6MTYwNzY5OTMyMCwiZXhwIjoxNjA3NzAyOTIwfQ.2jU-TC7YwGdtLjyyX3WjPXiR8tcdp_oJhS5uxXpOlZg'
            }
        })
        .then(res => res.json())
        .then(res => {
            dispatch(getItemSuccess(res))
        })
        .catch((err) => {
            dispatch(getItemsFailed(err))
        })
    }
}