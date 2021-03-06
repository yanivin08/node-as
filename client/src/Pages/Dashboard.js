import React, { Component } from 'react'
import TextWidget from '../Components/TextWidget/TextWidget'
import { Language, MailOutline, CalendarToday } from '@material-ui/icons'
import Graph from '../Components/Graph/Line/Graph';
import Pie from '../Components/Graph/Pie/Graph';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { getItems } from '.././Actions/dataAction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import { BeatLoader } from 'react-spinners';

export class Dashboard extends Component {

    getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    async componentDidMount(){
        const token = this.getCookie("a") + "." + this.getCookie("dt");
        await this.props.getItems(token);
    }

    render() {
        if(this.props.error){
            return <Redirect to={{
                pathname: "/login",
                state: { message: this.props.message }
              }}/>
        }else{
            return (
                <div>
                    <Navbar/>
                    <div className='dashboard'>
                        <Grid container spacing={3}>
                            <Grid item sm={4} xs={12}>
                                <TextWidget title='Website' value={this.props.website.value} description={this.props.website.description} icon={<Language style={{fontSize: '50px'}}/>}/>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <TextWidget title='Email' value={this.props.email.value} description={this.props.email.description} icon={<MailOutline style={{fontSize: '50px'}}/>}/>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <TextWidget title='Total' value={this.props.total.value} description={this.props.total.description} icon={<CalendarToday style={{fontSize: '50px'}}/>}/>
                            </Grid>
                            <Grid item sm={8} xs={12}>
                                {this.props.loading
                                    ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}><BeatLoader loading/></div>
                                    : <Graph options={this.props.lineGraph.options} series={this.props.lineGraph.series} />}
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                {this.props.loading
                                    ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}><BeatLoader loading/></div>
                                    : <Pie options={this.props.pieGraph.options} series={this.props.pieGraph.series}/> }
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )
        }
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
    message: state.data.message,
    loading: state.data.loading
})

export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);
