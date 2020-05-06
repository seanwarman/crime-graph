import React from 'react'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { fetchPosts } from './actions'

const loggerMiddleware = createLogger()

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default class App extends React.Component {

  componentDidMount() {
    store.dispatch(fetchPosts('reactjs')).then(() => console.log(store.getState()))
  }

  render() {
    return (
      <div>Hi there!</div>
    )
  }
}

