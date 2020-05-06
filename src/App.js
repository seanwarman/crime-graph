import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import crimeGraph from './reducers'

import Home from './views/Home'
import './App.css'

const store = createStore(
  crimeGraph,
  applyMiddleware(
    thunkMiddleware
  )
)


export default class App extends React.Component {

  render() {
    return (
      <Home store={store} />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
