import React from 'react'
import ReactDOM from 'react-dom'

import { createStore } from 'redux'
import crimeGraph from './reducers'

import Home from './views/Home'
import './App.css'

const store = createStore(crimeGraph)


export default class App extends React.Component {

  render() {
    return (
      <Home store={store} />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
