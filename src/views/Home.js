import React from 'react'
import { crimeRequest, fetchCrimes } from '../actions'

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.store             = this.store.bind(this)
    this.crimeRequest      = this.crimeRequest.bind(this)
    this.render            = this.render.bind(this)
  }

  componentDidMount() {

    // Triggering a setState will cause react to re-render but this
    // probably isn't how I should be doing it...
    this.props.store.subscribe(() => this.setState({thing: 'blah'}))

    this.crimeRequest(10, 12, '2020-02')
  }

  crimeRequest(lng, lat, date) {
    this.props.store.dispatch(fetchCrimes(lng, lat, date))
  }

  store() {
    return this.props.store.getState()
  }

  render() {

    return (
      <>
        {
          this.store().date
        }
        {
          this.store().crime.map(cr => cr.category)
        }
      </>

    )
  }
}

