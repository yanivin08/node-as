import React, { Component } from 'react'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { login } from '.././Actions/loginAction';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom'
import Homepage from './Homepage';

export class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    async onLogin() {
        await this.props.login(this.state.username,this.state.password);
        console.log(this.props)
    }

    onChanges = (e) => {
        e.target.name == 'username'
            ? this.setState({
                    ...this.state,
                    username: e.target.value
                })
            : this.setState({
                    ...this.state,
                    password: e.target.value
                })
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
                    <input type='text' placeholder='Username' name='username' onChange={this.onChanges}/>
                    <input type='password' placeholder='Password' name='password' onChange={this.onChanges}/>
                    <button onClick={() => this.onLogin()}>Submit</button>
                </div>
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
