import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
                    <Route path='/dashboard' exact component={Dashboard}/>
                    <Route path='/data' component={Data}/>
                    <Route path='/settings' component={Settings}/>
                    <Route path='/team' component={Team}/>
                </Switch>
            </Router>
        )
    }
}

export default Homepage
