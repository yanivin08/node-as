import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Grid, TextField, Paper, FormControl, InputLabel, Select as MuiSelect, Container, Button } from '@material-ui/core'
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { addUser, getUsers } from '.././Actions/userAction';
import PropTypes from 'prop-types';
import { BeatLoader } from 'react-spinners';
export class Team extends Component {

    initialState = {
        columns : [
            {
                title: "First Name",
                field: "first_name"
            },
            {
                title: "Second Name",
                field: "second_name"
            },
            {
                title: "Email",
                field: "email"
            },
            {
                title: "Job Position",
                field: "position"
            },
            {
                title: "Department",
                field: "department"
            },
            {
                title: "User Type",
                field: "user_type"
            },
            {
                title: "Date Register",
                field: "register_date"
            }
        ],
        first_name: "",
        second_name: "",
        email: "",
        position: "",
        department: "",
        user_type: "",
        formErrors: false
    }

    state = this.initialState;


    onChanges = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    onClear = () => {
        this.myFormRef.reset();
        this.setState(this.initialState)
    }

    onSubmit = async(event) => {
        event.preventDefault();
        const { first_name, second_name, email, position, department, user_type } = this.state
        await this.props.addUser({first_name, second_name, email, position, department, user_type})
    }

    async componentDidMount(){
        const token = document.cookie.split('=')[1];
        await this.props.getUsers(token);
    }

    render() {
        return (
            <div style={{backgroundColor: '#f4f4f4'}}>
                <Navbar/>
                <Container className='user' style={{backgroundColor: '#f4f4f4'}}>
                    <Paper style={{padding: '25px'}}>
                        <h4 style={{paddingBottom: '25px'}}>Add new user</h4>
                        <form ref={(el) => this.myFormRef = el} onSubmit={this.onSubmit}>
                            <Grid container>
                                <Grid item xs={12} sm={6} style={{paddingRight: '50px'}}>
                                    <TextField fullWidth  variant='outlined' name="first_name" label="First Name" onBlur={this.onChanges} style={{paddingBottom: '15px'}}/>
                                    <TextField fullWidth  variant='outlined' name="second_name" label="Second Name" onBlur={this.onChanges} style={{paddingBottom: '15px'}}/>
                                    <TextField fullWidth variant='outlined' name="email" label="Email" onBlur={this.onChanges}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth variant='outlined' name="position" label="Job Position" onBlur={this.onChanges} style={{paddingBottom: '15px'}}/>
                                    <FormControl fullWidth variant="outlined" style={{paddingBottom: '15px'}}>
                                        <InputLabel>Department</InputLabel>
                                        <MuiSelect
                                            native
                                            label="Department"
                                            name="department"
                                            onBlur={this.onChanges}>
                                            <option aria-label="None" value="" />
                                            <option value="Transformation and Solutioning">Transformation and Solutioning</option>
                                        </MuiSelect>
                                    </FormControl>
                                    <FormControl  variant="outlined" style={{width: '300px'}}>
                                        <InputLabel>User Type</InputLabel>
                                        <MuiSelect
                                            native
                                            label="Department"
                                            name="user_type"
                                            onBlur={this.onChanges}>
                                            <option aria-label="None" value="" />
                                            <option value="Guest">Guest</option>
                                            <option value="User">User</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Super Admin">Super Admin</option>
                                        </MuiSelect>
                                    </FormControl>
                                </Grid>
                                <Button type='submit' color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}}>Save</Button>
                                <Button color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}} onClick={this.onClear}>Clear</Button>
                            </Grid>
                        </form>
                        {this.props.loading
                            ? <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}><BeatLoader loading/></div>
                            : <MaterialTable 
                                style={{marginTop: '20px', padding: '10px'}} 
                                columns={this.state.columns}
                                data={this.props.data}
                                options={{
                                    filtering: false,
                                    search: false,
                                    showTitle: false,
                                    pageSize: 5,
                                    toolbar: false 
                                }} 
                                components={{
                                    Container: props => <Paper {...props} elevation={0}/>
                                }}
                                >
                            </MaterialTable>}
                    </Paper>
                </Container>
            </div>
        )
    }
}

Team.propTypes = {
    addUser: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        addUser: bindActionCreators(addUser, dispatch),
        getUsers: bindActionCreators(getUsers, dispatch)
    }
}

const mapStateToProps = (state) => ({
    loading: state.teams.loading,
    error: state.teams.error,
    data: state.teams.data,
    message: state.teams.message
})

export default connect(mapStateToProps, mapDispatchToProps )(Team);