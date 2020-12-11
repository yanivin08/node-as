import React, { Component } from 'react'
import TextWidget from '../Components/TextWidget/TextWidget'
import * as IoIcons from 'react-icons/io';
import * as FaIcons from 'react-icons/fa';
import Graph from '../Components/Graph/Line/Graph';
import Pie from '../Components/Graph/Pie/Graph';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { getItems } from '.././Actions/dataAction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom'
import Login from '../Components/Login'
export class Dashboard extends Component {

    async componentDidMount(){
        await this.props.getItems();
    }

    render() {
        
        /*if(this.props.error){
            if(this.props.message == "Unauthorize access!"){
                return <Redirect message='Unauthorize access!' to='/'/>
            }else{
                return <Redirect message='Your credential has expired!' to='/'/>
            }
        }*/

        return (
            <div className='dashboard'>
                <Grid container spacing={3}>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Website' value={this.props.website.value} description={this.props.website.description} icon={<IoIcons.IoIosGlobe/>}/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Email' value={this.props.email.value} description={this.props.email.description} icon={<FaIcons.FaRegEnvelope/>}/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Total' value={this.props.total.value} description={this.props.total.description} icon={<FaIcons.FaRegCalendar/>}/>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <Graph options={this.props.lineGraph.options} series={this.props.lineGraph.series} />
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Pie options={this.props.pieGraph.options} series={this.props.pieGraph.series}/>    
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getItems: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        getItems: bindActionCreators(getItems, dispatch)
    }
}

const mapStateToProps = (state) => ({
    lineGraph: state.data.lineGraph,
    pieGraph: state.data.pieGraph,
    email: state.data.email,
    website: state.data.website,
    total: state.data.total,
    error: state.data.error,
    message: state.data.message
})

export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);
