import React, { Component } from 'react'
import { Grid, TextField, Button, Typography } from '@material-ui/core'
import { Alert } from '@material-ui/lab';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { changePass } from '.././Actions/userAction';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';


export class ChangePass extends Component {

    state = {
        password: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        }
    }

    onChangePass = (e) => {
        const { name, value } = e.target;
        this.setState({ password: {...this.state.password,
            [name]: value 
        }});
    }

    onSubmitPass = async(event) => {
        const token = this.getCookie("a") + "." + this.getCookie("dt");
        event.preventDefault();
        await this.props.changePass(token,this.state.password)
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

    signOut = () => {
        document.cookie = "a=\"\";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "dt=\"\";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "u=\"\";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        document.cookie = "val=\"\";path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        window.location.reload();
    }

    render() {

        if(this.getCookie("a") === ""){
            return <Redirect to="/login"/>
        }else{
        
            return (
                <div className='changepass'>
                    <Grid>
                        <Grid>
                            <Grid align='center' style={{maxWidth: '300px'}}>
                                <Typography>This is your first time login, please change password to continue.</Typography>
                                {this.props.error ? <Alert severity="error">{this.props.message}</Alert> : "" }
                                <form onSubmit={this.onSubmitPass}>
                                    {this.props.message !== "" ? <Alert severity={this.props.messageType}>{this.props.message}</Alert> : "" }
                                    <TextField value={this.state.password.old_password} variant='outlined' label="Old Password" margin="normal" type="password" name='old_password' fullWidth required onChange={this.onChangePass}/>
                                    <TextField value={this.state.password.new_password} variant='outlined' label="New Password" margin="normal" type="password" name='new_password' fullWidth required onChange={this.onChangePass}/>
                                    <TextField value={this.state.password.confirm_password} variant='outlined' label="Confirm Password" margin="normal" type="password" name='confirm_password' fullWidth required onChange={this.onChangePass}/>
                                    <Button type='submit' color='primary' variant='contained' fullWidth style={{marginTop: '25px'}}>Submit</Button>
                                    <Button type='submit' color='default' variant='contained' fullWidth style={{marginTop: '-20px'}} onClick={this.signOut}>Cancel</Button>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}

ChangePass.propTypes = {
    changePass: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        changePass: bindActionCreators(changePass, dispatch)
    }
}

const mapStateToProps = (state) => ({
    loading: state.teams.loading,
    error: state.teams.error,
    message: state.teams.message,
    messageType: state.teams.messageType
})

export default connect(mapStateToProps, mapDispatchToProps )(ChangePass);