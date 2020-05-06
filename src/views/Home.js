import React from 'react'
import { fetchPosts } from '../actions'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    // this.props.dispatch(fetchPosts('reactjs')).then(() => console.log(this.props.getState()))
  }
  render() {
    return (
      <div>Nice here!</div>
    )
  }
}

