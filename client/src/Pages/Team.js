import React, { Component } from 'react';
import Navbar from '../Components/Navbar/Navbar';
import { Grid, TextField, Paper, FormControl, InputLabel, Select as MuiSelect, MenuItem, Container, Button } from '@material-ui/core'
import MaterialTable from 'material-table';
export class Team extends Component {
    render() {
        return (
            <div style={{backgroundColor: '#f4f4f4'}}>
                <Navbar/>
                <Container className='user' style={{backgroundColor: '#f4f4f4'}}>
                    <Paper style={{padding: '50px'}}>
                        <h4 style={{paddingBottom: '25px'}}>Add new user</h4>
                        <Grid container>
                            <Grid item xs={12} sm={6} style={{paddingRight: '50px'}}>
                                <TextField fullWidth variant='outlined' name="firstName" label="First Name"/>
                                <TextField fullWidth variant='outlined' name="secondName" label="Second Name"/>
                                <TextField fullWidth variant='outlined' name="email" label="Email"/>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth variant='outlined' name="jobPosition" label="Job Position"/>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Department</InputLabel>
                                    <MuiSelect
                                        label="Department"
                                        name="department">
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="TAS">Transformation and Solutioning</MenuItem>
                                    </MuiSelect>
                                </FormControl>
                                <FormControl  variant="outlined" style={{width: '300px'}}>
                                    <InputLabel>User Type</InputLabel>
                                    <MuiSelect
                                        label="Department"
                                        name="department">
                                        <MenuItem value="">None</MenuItem>
                                        <MenuItem value="U">User</MenuItem>
                                        <MenuItem value="A">Admin</MenuItem>
                                        <MenuItem value="SA">Super Admin</MenuItem>
                                    </MuiSelect>
                                </FormControl>
                            </Grid>
                            <Button type='submit' color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}}>Save</Button>
                            <Button type='submit' color='primary' variant='contained' style={{width: '150px', marginRight: '10px',  marginTop: '15px'}}>Clear</Button>
                        </Grid>
                    </Paper>
                    <MaterialTable 
                        style={{marginTop: '15px', padding: '10px'}} 
                        title="Users" 
                        >
                    </MaterialTable>
                </Container>
            </div>
        )
    }
}

export default Team
