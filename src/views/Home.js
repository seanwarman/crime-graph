import React from 'react'
import { connect } from 'react-redux'
import { fetchCrimes } from '../actions'
import { Bar } from 'react-chartjs-2'
import './Home.css'
import { Map, Marker, TileLayer } from 'react-leaflet'

class Home extends React.Component {
  constructor(props) {
    super(props)

    // I'm using state here to deal with the input renders
    // only. This way they stay responsive rather than having to
    // update with the store.
    this.state = {
      lng: 0,
      lat: 0
    }
  }

  componentDidMount() {

    this.props.fetchCrimes(this.props.lat, this.props.lng, this.props.date)

    this.setState({lng: this.props.lng, lat: this.props.lat})

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

  handleChange(key, value) {
    let lng = key === 'lng' ? value : this.props.lng
    let lat = key === 'lat' ? value : this.props.lat

    this.setState({lng, lat})

    this.props.fetchCrimes(lat, lng, this.props.date)

  }

  render() {

    return (
      <div>
        <h1>Crime Graph</h1>
        <div style={{
          marginBottom: '20px'
          }}>
          lng:
          <input
            onChange={e => this.handleChange('lng', e.target.value)}
            step=".01"
            type="number"
            value={this.state.lng} 
          />

          lat:
          <input
            onChange={e => this.handleChange('lat', e.target.value)}
            step=".01"
            type="number"
            value={this.state.lat}
          />
        </div>

        <Map center={[this.props.lat, this.props.lng]} zoom={12}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />


          {
            this.props.crime.map(cr => {
              return <Marker
                key={cr.id}
                position={[
                  cr.location.latitude,
                  cr.location.longitude
                ]}
              />
            })
          }
        </Map>

        <Bar 
          data={{
            labels: this.labelsByCategory(this.props.crime),
            datasets: [{
              label: 'Number of Crimes by Category',
              data: this.dataByCategory(this.props.crime),
              backgroundColor: '#95a8d4',
              borderColor: '#95a8d4',
              borderWidth: 1
            }]
          }}
          options={{
            startAtZero: true
          }}
        />

      </div>

    )
  }
}

export default connect(
  state => ({ 
    crime: state.crime,
    lng:   state.lng,
    lat:   state.lat,
    date:  state.date
  }),
  { fetchCrimes }
)(Home)
