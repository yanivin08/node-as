import React, { Component, Children } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { authenticate } from '.././Actions/authAction';
import PropTypes from 'prop-types';

export class PrivateRoute extends Component {

    state = {
        login: false,
        user: false
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

    checkUser = () => {
        if(this.getCookie("u") === "true"){
            return true
        }else{
            return false
        }
    }
    
    checkToken = () => {
        return this.getCookie("a") === ""
                    ? false
                    : true
    }

    componentWillReceiveProps(){
        console.log(this.props)
    }

    componentDidMount(){
        if(this.props.location.state !== undefined){
            
            let token = this.props.location.state.data.token.split(".")
            let user =this.props.location.state.data.user.user
            let type = 0
            let now = new Date()

            console.log(this.props.location.state.data);

            if(this.props.location.state.data.user.user_type == "Guest" || this.props.location.state.data.user.user_type == "User"){
                type = 1;
            }else if(this.props.location.state.data.user.user_type == "Admin"){
                type = 2;
            }else if(this.props.location.state.data.user.user_type == "Super Admin"){
                type = 3;
            }

            now.setTime(now.getTime()+(60*60*1000))

            document.cookie = `a=${token[0]};expires=${now.toGMTString()};path=/`
            document.cookie = `dt=${token[1] + "." + token[2]};expires=${now.toGMTString()};path=/`
            document.cookie = `u=${user};expires=${now.toGMTString()};path=/`
            document.cookie = `val=${type};expires=${now.toGMTString()};path=/`

            this.setState({
                login: true,
                user: this.props.location.state.data.user.user
            })
        }
    }

    render() {
        
        const { location } = this.props;
        const children = this.props.children
       
        return (
            <>
                <Route render={() => {
                    return this.props.location.state
                                ? this.props.location.state.login
                                    ? this.props.location.state.data.user.user
                                        ? <Redirect to='/changepass' />
                                        : Children.map(children, child => React.cloneElement(child, { ...location}))
                                    : <Redirect to='/login' />
                                : this.checkToken()
                                    ? this.checkUser()
                                        ? <Redirect to='/changepass' />
                                        : Children.map(children, child => React.cloneElement(child, { ...location}))
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
