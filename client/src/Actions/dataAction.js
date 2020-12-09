import { GET_ITEMS_START, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from './type';

function getDate(date){
    return new Date(date).toLocaleDateString('en-US', {
        month: '2-digit',day: '2-digit',year: 'numeric'});
}

export const getItems = () => {

    return (dispatch) => {
        dispatch({
            type: GET_ITEMS_START
        })
        fetch('/dashboard', {
            method: 'GET',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjUyZDdiYzVjMzVmNDFlMDZjYjIxOCIsImlhdCI6MTYwNzUzMzg1MCwiZXhwIjoxNjA3NTM3NDUwfQ.jJs7YqqqGO_MkOGbvDHuhWtndjBJPZOl0xnVqnp6rgg'
            }
        })
        .then(res => res.json())
        .then((res) => {
            

            let webValue = res.filter(i => i.appt_type == "Website").length
            let mailValue = res.filter(i => i.appt_type == "Email").length
            let totalValue = res.length

            let webDesc = (webValue/totalValue * 100).toFixed(2);
            let mailDesc = (mailValue/totalValue * 100).toFixed(2);
            let emailGraph = {};
            let webGraph = {};

            res.filter(i => i.appt_type == "Website").forEach(e => webGraph[getDate(e.date_extracted)] = (webGraph[getDate(e.date_extracted)] || 0) + 1);
            res.filter(i => i.appt_type == "Email").forEach(e => emailGraph[getDate(e.date_extracted)] = (emailGraph[getDate(e.date_extracted)] || 0) + 1);

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
                xaxis: Object.keys(emailGraph).length >= Object.keys(webGraph).length ? Object.keys(emailGraph) : Object.keys(webGraph),
                series: [
                    {
                        name: 'Email',
                        data: Object.values(webGraph)
                    },
                    {
                        name: 'Website',
                        data: Object.values(emailGraph)
                    }
                ]
            }

            dispatch({
                type: GET_ITEMS_SUCCESS,
                payload: stateHandler
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_ITEMS_FAILED,
                payload: err
            })
        })
    }
}