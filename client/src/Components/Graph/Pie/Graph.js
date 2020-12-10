import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import { Card, CardHeader, Divider, CardContent} from '@material-ui/core';
import './Graph.css'
export class Graph extends Component {

    render() {
        return (
            <Card class="pieGraph">
                <CardHeader title="Appointment Status" />
                <Divider />
                <CardContent>
                    <Chart 
                        options={this.props.options} 
                        series={this.props.series} 
                        type="donut" 
                    />
                </CardContent>
            </Card>
        )
    }
}

export default Graph