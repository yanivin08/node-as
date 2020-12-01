import React, { Component } from 'react'
import TextWidget from '../Components/TextWidget/TextWidget'
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import Graph from '../Components/Graph/Line/Graph';
import Pie from '../Components/Graph/Pie/Graph';
import Table from '../Components/Table/Table'
import Grid from '@material-ui/core/Grid';
export class Dashboard extends Component {
    render() {
        return (
            <div className='dashboard'>
                <Grid container spacing={3}>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Website' value='580' description='50% of the total appointments' icon={<IoIcons.IoIosGlobe/>}/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Email' value='580' description='50% of the total appointments' icon={<FaIcons.FaRegEnvelope/>}/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Total' value='1160' description='50% of the total appointments' icon={<FaIcons.FaRegCalendar/>}/>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <Graph/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Pie/>
                    </Grid>
                    <Grid item sm={4}xs={12}>
                        <Pie/>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <Table/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Dashboard
