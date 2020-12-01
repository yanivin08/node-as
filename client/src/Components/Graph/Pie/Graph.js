import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import { Card, CardHeader, Divider, CardContent} from '@material-ui/core';
import './Graph.css'
export class Graph extends Component {
    constructor(props) {
          super(props);

          this.state = {
          
            series: [44, 55, 41, 17],
            options: {
                chart: {
                    background: "#fffff",
                    foreColor: "#333",
                },
                responsive: [
                        {
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }
                ],
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
                            labels: {
                                show: true
                            },
                            total:{
                                show: true
                            }
                        }
                    }
                }
                
            }
        }
    }

    render() {
        return (
            <Card class="pieGraph">
                <CardHeader title="Appointment Status" />
                <Divider />
                <CardContent>
                    <Chart 
                        options={this.state.options} 
                        series={this.state.series} 
                        type="donut" 
                    />
                </CardContent>
            </Card>
        )
    }
}

export default Graph