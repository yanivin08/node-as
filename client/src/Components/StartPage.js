import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login'
import Homepage from './Homepage'
import PrivateRoute from './PrivateRoute'


export class StartPage extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <PrivateRoute path='/user'>
                        <Homepage/>
                    </PrivateRoute>
                    <Route path="/">
                        <Redirect to='/user'/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default StartPage
