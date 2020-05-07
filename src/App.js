import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
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
      <Provider store={store}>
        <Home />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
