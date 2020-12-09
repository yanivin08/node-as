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
export class Dashboard extends Component {

    state = {
        website: {
            value: 0,
            description: "This is just a test only"
        },
        email: {
            value: 0,
            description: "This is just a test only"
        },
        total: {
            value: 0,
            description: "This is just a test only"
        },
        webGraph:{

        },
        emailGraph:{

        },
        token: ""
    }    

    /*getDate(date){
        return new Date(date).toLocaleDateString('en-US', {
            month: '2-digit',day: '2-digit',year: 'numeric'});
    }

    async getData(){
        try {
            let request = await fetch('/user/auth', {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "username": "yanivin08",
                    "password": "password"
                })
            })

            let result = await request.json();

            if(result){

                this.setState({...this.state, 
                    token: result.token
                })

                let getData = await fetch('/dashboard', {
                    method: 'GET',
                    headers: {
                        'Accept':'application/json',
                        'Content-Type': 'application/json',
                        'x-auth-token': result.token
                    }
                })

                let getResult = await getData.json()

                if(getResult){
                    
                    let webValue = getResult.filter(i => i.appt_type == "Website").length
                    let mailValue = getResult.filter(i => i.appt_type == "Email").length
                    let totalValue = getResult.length

                    let webDesc = (webValue/totalValue * 100).toFixed(2);
                    let mailDesc = (mailValue/totalValue * 100).toFixed(2);
                
                    this.setState({...this.state,
                        website: {
                            value: webValue,
                            description: webDesc + "% of the total Appointments"
                        },
                        email: {
                            value: mailValue,
                            description: mailDesc + "% of the total Appointments"
                        },
                        total: {
                            value: totalValue,
                            description: "Total number of appointment extracted"
                        }
                    })

                    let emailGraph = {};
                    let webGraph = {};

                    getResult.filter(i => i.appt_type == "Website").forEach(e => webGraph[this.getDate(e.date_extracted)] = (webGraph[this.getDate(e.date_extracted)] || 0) + 1);
                    getResult.filter(i => i.appt_type == "Email").forEach(e => emailGraph[this.getDate(e.date_extracted)] = (emailGraph[this.getDate(e.date_extracted)] || 0) + 1);

                    let stateHandler = {...this.state}
                    stateHandler.emailGraph = emailGraph;
                    stateHandler.webGraph = webGraph;
                    
                    this.setState({...stateHandler});
                    
                }
            }
        }
        catch(e){
            console.log(e)
        }
    }*/

    async componentDidMount(){
        await this.props.getItems();
    }

    render() {
        console.log(this.props.options);
        return (
            <div className='dashboard'>
                <Grid container spacing={3}>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Website' value={this.state.website.value} description={this.state.website.description} icon={<IoIcons.IoIosGlobe/>}/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Email' value={this.state.email.value} description={this.state.email.description} icon={<FaIcons.FaRegEnvelope/>}/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <TextWidget title='Total' value={this.state.total.value} description={this.state.total.description} icon={<FaIcons.FaRegCalendar/>}/>
                    </Grid>
                    <Grid item sm={8} xs={12}>
                        <Graph email={this.state.emailGraph} web={this.state.webGraph} token={this.state.token}/>
                    </Grid>
                    <Grid item sm={4} xs={12}>
                        <Pie/>
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
    options: state.data.options,
    series: state.data.series,
    email: state.data.email,
    website: state.data.website,
    total: state.data.total,
})

export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);
