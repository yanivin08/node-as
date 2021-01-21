import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard'
import Data from '../Pages/Data'
import Settings from '../Pages/Settings'
import Team from '../Pages/Team'
import Login from './Login';

export class Homepage extends Component {
    
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/user/dashboard' exact component={Dashboard}/>
                    <Route path='/user/data' component={Data}/>
                    <Route path='/user/account' component={Settings}/>
                    <Route path='/user/team' component={Team}/>
                    <Route path='/user'>
                        <Redirect to='/user/dashboard'/>
                    </Route>
                    <Route path='/login' component={Login}/>
                </Switch>
            </Router>
        )
    }
}

export default Homepage
