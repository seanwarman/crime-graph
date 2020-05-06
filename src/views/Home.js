import React from 'react'
import { fetchCrime } from '../actions'

export default class Home extends React.Component {
  constructor(props) {
    super(props)

    this.loadData          = this.loadData.bind(this)
    this.fetchCrime        = this.fetchCrime.bind(this)
    this.renderDateOfCrime = this.renderDateOfCrime.bind(this)
    this.render            = this.render.bind(this)
  }

  componentDidMount() {
    console.log('this.props.store.getState(): ', this.props.store.getState())
    this.loadData()
  }

  loadData() {
    console.log('loading...')
    console.log('this: ', this)
    this.fetchCrime(10, 12, '2020-02')
  }

  fetchCrime(lng, lat, date) {
    this.props.store.dispatch(fetchCrime(lng, lat, date))
  }

  renderDateOfCrime() {
    return this.props.store.getState().date
  }

  render() {

    return (
      <div>{this.renderDateOfCrime()}</div>
    )
  }
}

