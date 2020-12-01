import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import './Graph.css'

export class Graph extends Component {
    constructor(props){
        super(props)
        this.state = {
            options: {
                chart: {
                    background: "#f4f4f4",
                    foreColor: "#333"
                },
                xaxis: {
                    categories: [
                      "11-1-20",
                      "11-2-20",
                      "11-3-20",
                      "11-4-20",
                      "11-5-20",
                      "11-6-20",
                      "11-7-20",
                      "11-8-20",
                      "11-9-20",
                      "11-10-20"
                    ]
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
                }
            },
            series: [
                {
                    name: 'Website',
                    data: [
                        50,
                        29,
                        35,
                        59,
                        49,
                        15,
                        25,
                        32,
                        43,
                        35
                    ]
                },
                {
                    name: 'Email',
                    data: [
                        35,
                        25,
                        52,
                        37,
                        58,
                        65,
                        30,
                        40,
                        15,
                        28
                    ]
                }
            ]
        }
    }

    render() {
        console.log(this.state);
        return (
            <div className="lineChart">
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height="350"
                />
            </div>
        )
    }
}

export default Graph
