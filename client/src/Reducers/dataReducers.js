import { GET_ITEMS_START, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED }  from '../Actions/type';

const initialState = {
    loading: true,
    error: false,
    website: {
        value: 0,
        description: 0 + "% of the total Appointments"
    },
    email: {
        value: 0,
        description: 0 + "% of the total Appointments"        
    },
    total: {
        value: 0,
        description: 0 + "% of the total Appointments"
    },
    lineGraph: {
        options: {
            chart: {
                background: "#fffff",
                foreColor: "#333",
                toolbar:{
                    show: false
                },
                animations: {
                    enabled: true
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
        series: []
    },
    pieGraph: {
        options: {
            chart: {
                background: "#fffff",
                foreColor: "#333",
                animations: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            labels: [
                  "Completed",
                  "Cancelled",
                  "Pending",
                  "Confirmed"
            ],
            legend: {
                position: 'bottom',
                show: true
            },
            plotOptions: {
                pie: {
                    donut: {
                        show: true,
                    }
                }
            }
        },
        series: []
    },
    message: ''
}


export default function(state = initialState, actions){
    
    switch(actions.type){
        case GET_ITEMS_START: 
            return {
                ...state,
                loading: true
            }
        case GET_ITEMS_SUCCESS:
            return {
                ...state,
                loading: false,
                website: actions.payload.website,
                email: actions.payload.email,
                total: actions.payload.total,
                lineGraph: {
                    ...state.lineGraph,
                    options: {
                        ...state.lineGraph.options,
                        xaxis: {
                            ...state.lineGraph.options.xaxis,
                            categories: actions.payload.lineGraph.xaxis
                        }
                    },
                    series: actions.payload.lineGraph.series,
                },
                pieGraph: {
                    ...state.pieGraph,
                    series: actions.payload.pieGraph.series 
                }
                
            }

        case GET_ITEMS_FAILED:
            return {
                ...state,
                loading: false,
                error: true,
                message: actions.payload
            }
        default:
            return state
    }
}