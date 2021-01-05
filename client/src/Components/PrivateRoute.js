import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { authenticate } from '.././Actions/authAction';
import PropTypes from 'prop-types';

export class PrivateRoute extends Component {
    
    /*state = {
        request: false
    }*/

    async authenticate(){
        
            let token = document.cookie
            

            if(token == ""){
                return false
            }else{
                let req = await this.props.authenticate(token.split('=')[1]);
                if(this.props.isLoggedIn){
                    return true
                }
            }
        
    }

    checkToken(){
        if(document.cookie == ""){
            return false
        }else{
            return true
        }
    }

    render() {

        
        
        if(this.props.location.state != undefined){
            let token = this.props.location.state.data.token
            document.cookie = `token=${token}`
        }

        return (
            <>
                <Route render={() => {
                    return this.props.location.state != undefined
                        ? this.props.location.state.login
                            ? this.props.children
                            : this.authenticate()
                                ? this.props.children
                                : <Redirect to='/login' />
                        : this.checkToken() 
                            ? this.props.children
                            : <Redirect to='/login' />
                }}/>
            </>
        )
    }
}


PrivateRoute.propTypes = {
    authenticate: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
    return {
        authenticate: bindActionCreators(authenticate, dispatch)
    }
}

const mapStateToProps = (state) => ({
    error: state.auth.error,
    message: state.auth.message,
    data: state.auth.data,
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.auth.loading
})

export default connect(mapStateToProps, mapDispatchToProps )(PrivateRoute)

//export default PrivateRoute
