import './App.css';
import React, { Component } from 'react';
import Login from './Components/Login'
import Homepage from './Components/Homepage'
import Store from './Store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
export class App extends Component {

  state = {
    login: false
  }

  render() {
    return (
      <Provider store={Store}>
        <Router>
            <Switch>
                <Route path='/' exact component={Login}/>
                <Route path='/dashboard' component={Homepage}/>
            </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
