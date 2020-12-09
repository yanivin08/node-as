import { GET_ITEMS_START, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from '../Actions/type';

const initialState = {
    website: {},
    email: {},
    total: {},
    options: {
        chart: {
            background: "#fffff",
            foreColor: "#333",
            toolbar:{
                show: false
            }
        },
        xaxis: {
            categories: []
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        },
        fill: {
            colors: ["#F44336"]
            },
        dataLabels: {
            enabled: false
        },
        legend:{
            show: false
        }
    },
    series: [],
}


export default function(state = initialState, actions){
    console.log(actions)
    switch(actions.type){

        case GET_ITEMS_SUCCESS:
            
            console.log( {
                ...state,
                website: actions.payload.website,
                email: actions.payload.email,
                total: actions.payload.total,
                options: {
                    ...state.options,
                    xaxis: {
                        ...state.actions.xaxis,
                        categories: actions.payload.xaxis
                    }
                },
                series: actions.payload.series
            })

        default:
            return state;
    }
}