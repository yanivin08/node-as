import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Grid, TextField, Paper, FormControl, InputLabel, Select as MuiSelect, MenuItem, Container, Button } from '@material-ui/core'
import MaterialTable from 'material-table';
export class Team extends Component {

    state = {
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
    }


    onChanges = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div style={{backgroundColor: '#f4f4f4'}}>
                <Navbar/>
                <Container className='user' style={{backgroundColor: '#f4f4f4'}}>
                    <Paper style={{padding: '25px'}}>
                        <h4 style={{paddingBottom: '25px'}}>Add new user</h4>
                        <form>
                            <Grid container>
                                <Grid item xs={12} sm={6} style={{paddingRight: '50px'}}>
                                    <TextField fullWidth variant='outlined' name="firstName" label="First Name" onChange={this.onChanges}/>
                                    <TextField fullWidth variant='outlined' name="secondName" label="Second Name" onChange={this.onChanges}/>
                                    <TextField fullWidth variant='outlined' name="email" label="Email" onChange={this.onChanges}/>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField fullWidth variant='outlined' name="jobPosition" label="Job Position" onChange={this.onChanges}/>
                                    <FormControl fullWidth variant="outlined" onChange={this.onChanges}>
                                        <InputLabel>Department</InputLabel>
                                        <MuiSelect
                                            label="Department"
                                            name="department">
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="TAS">Transformation and Solutioning</MenuItem>
                                        </MuiSelect>
                                    </FormControl>
                                    <FormControl  variant="outlined" style={{width: '300px'}} onChange={this.onChanges}>
                                        <InputLabel>User Type</InputLabel>
                                        <MuiSelect
                                            label="Department"
                                            name="department">
                                            <MenuItem value="">None</MenuItem>
                                            <MenuItem value="G">Guest</MenuItem>
                                            <MenuItem value="U">User</MenuItem>
                                            <MenuItem value="A">Admin</MenuItem>
                                            <MenuItem value="SA">Super Admin</MenuItem>
                                        </MuiSelect>
                                    </FormControl>
                                </Grid>
                                <Button type='submit' color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}}>Save</Button>
                                <Button color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}}>Clear</Button>
                            </Grid>
                        </form>
                        <MaterialTable 
                            style={{marginTop: '20px', padding: '10px'}} 
                            columns={this.state.columns} 
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
                        </MaterialTable>
                    </Paper>
                </Container>
            </div>
        )
    }
}

export default Team
