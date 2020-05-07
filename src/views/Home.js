import React from 'react'
import { connect } from 'react-redux'
import { fetchCrimes } from '../actions'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    this.props.fetchCrimes(10, 12, '2020-02')

  }

  render() {

    return (
      <>
        <ul>
        {
          this.props.crime.map(cr =>
              <li>{cr.category}</li>
          )
        }
      </ul>
      </>

    )
  }
}

export default connect(
  state => ({ crime: state.crime }),
  { fetchCrimes }
)(Home)
