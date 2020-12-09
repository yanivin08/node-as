import './App.css';
import React, { Component } from 'react';
import NavBar from './Components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard'
import Data from './Pages/Data'
import Settings from './Pages/Settings'
import Team from './Pages/Team'
import Store from './Store'
import { Provider } from 'react-redux'
export class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <NavBar />
            <Switch>
              <Route path='/' exact component={Dashboard}/>
              <Route path='/data' component={Data}/>
              <Route path='/settings' component={Settings}/>
              <Route path='/team' component={Team}/>
            </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
