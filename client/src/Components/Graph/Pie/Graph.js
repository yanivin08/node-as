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
                            show: true,
                            name: {
                                show: true,
                                fontSize: '22px',
                                fontFamily: 'Rubik',
                                color: '#dfsda',
                                offsetY: -10
                            },
                            value: {
                                show: true,
                                fontSize: '16px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                color: undefined,
                                offsetY: 16,
                                formatter: function (val) {
                                    return val
                                }
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#373d3f'
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