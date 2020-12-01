import './App.css';
import React, { Component } from 'react';
import NavBar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Data from './Pages/Data'
import Settings from './Pages/Settings'
import Team from './Pages/Team'
export class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/dashboard' component={Dashboard}/>
              <Route path='/data' component={Data}/>
              <Route path='/settings' component={Settings}/>
              <Route path='/team' component={Team}/>
            </Switch>
          
        </Router>
      </div>
    )
  }
}

export default App
