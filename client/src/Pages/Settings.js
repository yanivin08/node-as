import React, { Component } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import { Container, Grid, Paper, TextField, FormControl, InputLabel, Select as MuiSelect,Button } from '@material-ui/core';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { changePass, changeInfo, getInfo } from '.././Actions/userAction';
import PropTypes from 'prop-types';
import { BeatLoader } from 'react-spinners';
export class Settings extends Component {

    state = {
        info: {
            id: "",
            username: "",
            first_name: "",
            second_name: "",
            email: "",
            position: "",
            department: ""
        },
        password: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        }
    }

    onChangesInfo = (e) => {
        const { name, value } = e.target;
        this.setState({ info: {...this.state.info,
            [name]: value 
        }});
    }

    onSubmitInfo = async(event) => {
        const token = document.cookie.split('=')[1];
        event.preventDefault();
        await this.props.changeInfo(token,this.state.info)
    }

    onChangePass = (e) => {
        const { name, value } = e.target;
        this.setState({ password: {...this.state.password,
            [name]: value 
        }});
    }

    onSubmitPass = async(event) => {
        event.preventDefault();
        await this.props.changePass(this.state.password)
    }

    async getInformation(){
        const token = document.cookie.split('=')[1];
        await this.props.getInfo(token);

        this.setState({
                info: {
                    id: this.props.data._id,
                    username: this.props.data.username,
                    first_name: this.props.data.first_name,
                    second_name: this.props.data.second_name,
                    email: this.props.data.email,
                    position: this.props.data.position,
                    department: this.props.data.department
                }
            })
    }

    componentDidMount(){
        this.getInformation();
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className='settings'>
                    <Container>
                        <Paper style={{padding: '50px'}}>
                            <Grid container>
                                <Grid item xs={12} sm={6} style={{paddingRight: '50px'}}>
                                    <h5>Account Information</h5>
                                    {this.props.loading
                                        ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}><BeatLoader loading/></div>
                                        : <form style={{marginTop: '30px'}} onSubmit={this.onSubmitInfo}>
                                            <TextField value={this.state.info.username} variant='outlined' name="username" label="Username" onChange={this.onChangesInfo} style={{paddingBottom: '15px', width: '300px'}}/>
                                            <TextField value={this.state.info.first_name} variant='outlined' name="first_name" label="First Name" onChange={this.onChangesInfo} style={{paddingBottom: '15px', width: '350px'}}/>
                                            <TextField value={this.state.info.second_name} variant='outlined' name="second_name" label="Last Name" onChange={this.onChangesInfo} style={{paddingBottom: '15px', width: '350px'}}/>
                                            <TextField value={this.state.info.email} variant='outlined' name="email" label="Email" onChange={this.onChangesInfo} style={{paddingBottom: '15px', width: '350px'}}/>
                                            <TextField value={this.state.info.position} fullWidth variant='outlined' name="position" label="Job Position" onChange={this.onChangesInfo} style={{paddingBottom: '15px', width: '250px'}}/>
                                            <FormControl fullWidth variant="outlined" style={{paddingBottom: '15px', width: '350px'}}>
                                                <InputLabel>Department</InputLabel>
                                                <MuiSelect
                                                    native
                                                    value={this.state.info.department}
                                                    label="Department"
                                                    name="department"
                                                    onChange={this.onChangesInfo}>
                                                    <option aria-label="None" value="" />
                                                    <option value="Transformation and Solutioning">Transformation and Solutioning</option>
                                                </MuiSelect>
                                            </FormControl>
                                            <br/>
                                            <Button type='submit' color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}}>Save</Button>
                                        </form>}
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <h5>Change Password</h5>
                                    <form style={{marginTop: '30px'}}>
                                        <TextField variant='outlined' type='password' name="old_password" label="Old Password" style={{paddingBottom: '15px', width: '300px'}}/>
                                        <TextField variant='outlined' type='password' name="new_password" label="New Password" style={{paddingBottom: '15px', width: '300px'}}/>
                                        <TextField variant='outlined' type='password' name="confirm_password" label="Confirm Password" style={{paddingBottom: '15px', width: '300px'}}/>
                                        <br/>
                                        <Button type='submit' color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}}>Save</Button>
                                        <Button color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}} onClick={this.onClear}>Clear</Button>
                                    </form>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </div>
            </div>
        )
    }
}

Settings.propTypes = {
    changePass: PropTypes.func.isRequired,
    changeInfo: PropTypes.func.isRequired,
    getInfo: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        changePass: bindActionCreators(changePass, dispatch),
        changeInfo: bindActionCreators(changeInfo, dispatch),
        getInfo: bindActionCreators(getInfo, dispatch)
    }
}

const mapStateToProps = (state) => ({
    loading: state.teams.loading,
    error: state.teams.error,
    data: state.teams.data,
    message: state.teams.message,
    errorType: state.teams.errorType
})

export default connect(mapStateToProps, mapDispatchToProps )(Settings);