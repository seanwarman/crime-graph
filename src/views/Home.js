import React from 'react'
import { connect } from 'react-redux'
import { fetchCrimes } from '../actions'
import { Bar } from 'react-chartjs-2'


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {

    this.props.fetchCrimes(10, 12, '2020-02')

  }

  componentDidUpdate() {
    console.log('this.props.crime: ', this.props.crime)

  }

  labelsByCategory(crime) {

    return crime.reduce((arr,cr) => {

      if(arr.includes(cr.category)) return arr
      return [ ...arr, cr.category ]

    }, [])
  }

  dataByCategory(crime) {

    const categories = this.labelsByCategory(crime)

    return categories.map(cat => {
      return (crime.filter(cr => cr.category === cat) || []).length
    })

  }

  render() {

    return (
      <>

      <Bar 
        data={{
          labels: this.labelsByCategory(this.props.crime),
          datasets: [{
            label: 'Number of Crimes by Category',
            data: this.dataByCategory(this.props.crime),
            backgroundColor: 'white',
            //   'rgba(255, 99, 132, 0.2)',
            //   'rgba(54, 162, 235, 0.2)',
            //   'rgba(255, 206, 86, 0.2)',
            //   'rgba(75, 192, 192, 0.2)',
            //   'rgba(153, 102, 255, 0.2)',
            //   'rgba(255, 159, 64, 0.2)'
            // ],
            borderColor: 'white',
            //   'rgba(255, 99, 132, 1)',
            //   'rgba(54, 162, 235, 1)',
            //   'rgba(255, 206, 86, 1)',
            //   'rgba(75, 192, 192, 1)',
            //   'rgba(153, 102, 255, 1)',
            //   'rgba(255, 159, 64, 1)'
            // ],
            borderWidth: 1
          }]
        }}
      />

      </>

    )
  }
}

export default connect(
  state => ({ crime: state.crime }),
  { fetchCrimes }
)(Home)
