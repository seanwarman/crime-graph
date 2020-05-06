import React from 'react'
import ReactDOM from 'react-dom'

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import Home from './views/Home'
import './App.css'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default class App extends React.Component {

  render() {
    return (
      <Home dispatch={store.dispatch} getState={store.getState} />
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
