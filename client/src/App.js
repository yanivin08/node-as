import './App.css';
import React, { Component } from 'react';
import StartPage from './Components/StartPage'
import Store from './Store'
import { Provider } from 'react-redux'
export class App extends Component {

  state = {
    login: false
  }

  render() {
    return (
      <Provider store={Store}>
          <StartPage/>
      </Provider>
    )
  }
}

export default App
