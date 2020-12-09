import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import './Graph.css'
import { Card, CardHeader, Divider, CardContent} from '@material-ui/core';

export class Graph extends Component {
    constructor(props){
        super(props)
        this.state = {
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
            series: [
                {
                    name: 'Website',
                    data: []
                },
                {
                    name: 'Email',
                    data: []
                }
            ]
        }
    }

    
    render() {
        return (
            <Card className="lineChart">
                <CardHeader title="Daily Appointments" />
                <Divider />
                <CardContent>
                    <Chart
                        options={this.state.options}
                        series={this.state.series}
                        type="line"
                        height="400"
                    />
                </CardContent>
            </Card>
        )
    }
}

export default Graph
