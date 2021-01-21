import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './Login'
import Homepage from './Homepage'
import PrivateRoute from './PrivateRoute'
import ChangePass from '../Pages/ChangePass'

export class StartPage extends Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path='/changepass' component={ChangePass}/>
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
