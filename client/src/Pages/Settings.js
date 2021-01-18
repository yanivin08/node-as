import React, { Component } from 'react'
import Navbar from '../Components/Navbar/Navbar';
import { Container, Grid, Paper, TextField, FormControl, InputLabel, Select as MuiSelect,Button } from '@material-ui/core';

export class Settings extends Component {
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
                                    <form style={{marginTop: '30px'}}>
                                        <TextField variant='outlined' name="username" label="Username" style={{paddingBottom: '15px', width: '300px'}}/>
                                        <TextField variant='outlined' name="first_name" label="First Name" style={{paddingBottom: '15px', width: '350px'}}/>
                                        <TextField variant='outlined' name="last_name" label="Last Name" style={{paddingBottom: '15px', width: '350px'}}/>
                                        <TextField fullWidth variant='outlined' name="position" label="Job Position" onBlur={this.onChanges} style={{paddingBottom: '15px', width: '250px'}}/>
                                        <FormControl fullWidth variant="outlined" style={{paddingBottom: '15px', width: '350px'}}>
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
                                        <br/>
                                        <Button type='submit' color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}}>Save</Button>
                                        <Button color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}} onClick={this.onClear}>Clear</Button>
                                    </form>
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

export default Settings
