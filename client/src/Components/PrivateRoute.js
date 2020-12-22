import React, { Component } from 'react'
import { Children } from 'react'
import { Redirect, Route } from 'react-router-dom'

export class PrivateRoute extends Component {

    state = {
        isLoggedin: false
    }

    render() {
        return (
            <>
                <Route render={() => {
                    return this.state.isLoggedin
                        ? this.props.children
                        : <Redirect to='/login' />
                }}/>
            </>
        )
    }
}

export default PrivateRoute
