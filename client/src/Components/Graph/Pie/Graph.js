import React, { Component } from 'react'
import Chart from 'react-apexcharts';

export class Graph extends Component {
    constructor(props) {
          super(props);

          this.state = {
          
            series: [44, 55, 41, 17],
            options: {
                chart: {
                    background: "#f4f4f4",
                    foreColor: "#333"
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
                    ]
                },
                fill: {
                    colors: ["#F44336"]
                 },
                dataLabels: {
                    enabled: false
                },
                chartOptions: {
                    label: [
                      "Completed",
                      "Cancelled",
                      "Pending",
                      "Confirmed"
                    ]
                }
            }
        }

    render() {
        return (
            <div>
                <Chart options={this.state.options} series={this.state.series} type="donut" height="350"/>
            </div>
        )
    }
}

export default Graph