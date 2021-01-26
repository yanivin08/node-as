import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Grid, TextField, Paper, FormControl, InputLabel, Select as MuiSelect, Container, Button } from '@material-ui/core'
import MaterialTable from 'material-table';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { addUser, getUsers, changeType } from '.././Actions/userAction';
import PropTypes from 'prop-types';
import { BeatLoader } from 'react-spinners';
import { Redirect } from 'react-router-dom';
export class Team extends Component {

    initialState = {
        columns : [
            {
                title: "First Name",
                field: "first_name",
                editable: 'never'
            },
            {
                title: "Second Name",
                field: "second_name",
                editable: 'never'
            },
            {
                title: "Email",
                field: "email",
                editable: 'never'
            },
            {
                title: "Job Position",
                field: "position",
                editable: 'never'
            },
            {
                title: "Department",
                field: "department",
                editable: 'never'
            },
            {
                title: "User Type",
                field: "user_type",
                lookup: { "Guest": 'Guest', "User": 'User', "Admin": "Admin", "Super Admin": "Super Admin" }
            },
            {
                title: "Date Register",
                field: "register_date",
                editable: 'never',
                editComponent: props => (
                    <input
                    type="text"
                    value={props.value}
                    onChange={e => props.onChange(e.target.value)}
                    />)
            }
        ],
        tableData: [],
        first_name: "",
        second_name: "",
        email: "",
        position: "",
        department: "",
        user_type: "",
        formErrors: false
    }

    state = this.initialState;

    updateState(arr,oldDataId,userType){
    
        const token = this.getCookie("a") + "." + this.getCookie("dt");

        fetch('/user/change_type', {
            method: 'POST',
            headers: {
                'Accept':'application/json',
                'Content-Type': 'application/json',
                'x-auth-token': token
            },
            body: JSON.stringify({
                id: oldDataId,
                user_type: userType
            })
        })
        .then(() => {
            this.setState({tableData: arr})
        })
        .catch((err) => {
            console.log(err);
        })
    }

    deleteState(arr,dataId){
        
        if(dataId !== this.getCookie("i")){
            const token = this.getCookie("a") + "." + this.getCookie("dt");

            fetch('/user/delete_user', {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({
                    id: dataId
                })
            })
            .then(() => {
                this.setState({tableData: arr})
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
    
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
    
    componentWillReceiveProps(nextProps){
        if(nextProps.data){
            this.setState({tableData: nextProps.data})
        }
    }

    async componentDidMount(){
        const token = this.getCookie("a") + "." + this.getCookie("dt");
        await this.props.getUsers(token);
    }

    render() {

        if(parseInt(this.getCookie("val")) < 2){
            return <Redirect to="/user"/>
        }else{
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
                                                {parseInt(this.getCookie("val")) === 3 ? <option value="Super Admin">Super Admin</option> : null}
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
                                    data={this.state.tableData}
                                    options={{
                                        filtering: false,
                                        search: false,
                                        showTitle: false,
                                        pageSize: 5,
                                        toolbar: false 
                                    }} 
                                    editable={
                                        parseInt(this.getCookie("val")) === 3 ?
                                        {
                                            onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                const dataUpdate = [...this.state.tableData];
                                                const index = oldData.tableData.id;
                                                dataUpdate[index] = newData;
                                                this.updateState([...dataUpdate],newData._id,newData.user_type);

                                                resolve();
                                                }, 1000)
                                            }),
                                            onRowDelete: oldData => 
                                                new Promise((resolve, reject) => {
                                                    setTimeout(() => {
                                                        const dataDelete = [...this.state.tableData];
                                                        const index = oldData.tableData.id;
                                                        dataDelete.splice(index, 1);
                                                        this.deleteState([...dataDelete],oldData._id);
                                                        resolve();
                                                    }, 1000)
                                                })
                                        }
                                        : false
                                    } 
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
}

Team.propTypes = {
    addUser: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    changeType: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        addUser: bindActionCreators(addUser, dispatch),
        getUsers: bindActionCreators(getUsers, dispatch),
        changeType: bindActionCreators(changeType, dispatch)
    }
}

const mapStateToProps = (state) => ({
    loading: state.teams.loading,
    error: state.teams.error,
    data: state.teams.data,
    message: state.teams.message
})

export default connect(mapStateToProps, mapDispatchToProps )(Team);