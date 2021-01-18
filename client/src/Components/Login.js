import React, { Component } from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { login } from '.././Actions/loginAction';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import { Grid, TextField, Avatar, Button, Typography, Link } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';

export class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    onLogin = async(event) => {
        event.preventDefault();
        await this.props.login(this.state.username,this.state.password);
    }

    onChanges = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
    
        if(this.props.isLoggedIn){
            return <Redirect to={{
                pathname: "/user",
                state: { login: this.props.isLoggedIn, data: this.props.data }
              }}/>
        }else{
            return (
                <div className='login'>
                    <Grid>
                        <Grid>
                            <Grid align='center' style={{maxWidth: '300px'}}>
                                <Avatar style={{backgroundColor: '#4487ab'}}><LockOutlinedIcon/></Avatar>
                                <h2>Sign In</h2>
                                {this.props.error ? <Alert severity="error">{this.props.message}</Alert> : "" }
                                <form onSubmit={this.onLogin}>
                                    <TextField variant='outlined' label="Username" margin="normal" name='username' fullWidth required onChange={this.onChanges}/>
                                    <TextField variant='outlined' label="Password" margin="normal" type="password" name='password' fullWidth required onChange={this.onChanges}/>
                                    <Button type='submit' color='primary' variant='contained' fullWidth style={{marginTop: '25px'}}>Sign In</Button>
                                </form>
                                <Typography style={{marginTop: '10px'}}>
                                    <Link href='#'>
                                        Forgot password?
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>   
                /*<div className='login'>
                    <input type='text' placeholder='Username' name='username' onChange={this.onChanges}/>
                    <input type='password' placeholder='Password' name='password' onChange={this.onChanges}/>
                    <button onClick={() => this.onLogin()}>Submit</button>
                </div>*/
            )
        }
    }
}


Login.propTypes = {
    login: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(login, dispatch)
    }
}

const mapStateToProps = (state) => ({
    error: state.user.error,
    message: state.user.message,
    data: state.user.data,
    isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps, mapDispatchToProps )(Login)
