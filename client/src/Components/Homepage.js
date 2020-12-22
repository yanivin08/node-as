import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './Navbar/Navbar';
import Dashboard from '../Pages/Dashboard'
import Data from '../Pages/Data'
import Settings from '../Pages/Settings'
import Team from '../Pages/Team'

export class Homepage extends Component {
    
    render() {
        return (
            <Router>
                <NavBar />
                <Switch>
                    <Route path='/user/dashboard' exact component={Dashboard}/>
                    <Route path='/user/data' component={Data}/>
                    <Route path='/user/settings' component={Settings}/>
                    <Route path='/user/team' component={Team}/>
                    <Route path='/user'>
                        <Redirect to='/user/dashboard'/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default Homepage
