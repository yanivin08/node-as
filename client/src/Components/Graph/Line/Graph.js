import React, { Component } from 'react'
import Chart from 'react-apexcharts';
import './Graph.css'
import { Card, CardHeader, Divider, CardContent} from '@material-ui/core';

export class Graph extends Component {
    render() {
        console.log(this.props.series)
        return (
            <Card className="lineChart">
                <CardHeader title="Daily Appointments" />
                <Divider />
                <CardContent>
                    <Chart
                        options={this.props.options}
                        series={this.props.series}
                        type="line"
                        height="400"
                    />
                </CardContent>
            </Card>
        )
    }
}

export default Graph
