import React from 'react'
import { connect } from 'react-redux'
import { fetchCrimes } from '../actions'
import { Bar } from 'react-chartjs-2'
import './Home.css'
import { Map, Marker, TileLayer } from 'react-leaflet'


class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchCrimes(this.props.lat, this.props.lng, this.props.date)

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

    this.props.fetchCrimes(lat, lng, this.props.date)
  }

  render() {

    return (
      <>
      lng:
      <input
        onChange={e => this.handleChange('lng', e.target.value)}
        type="number"
        value={this.props.lng} 
      />

      lat:
      <input
        onChange={e => this.handleChange('lat', e.target.value)}
        type="number"
        value={this.props.lat} 
      />

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
            backgroundColor: 'white',
            borderColor: 'white',
            borderWidth: 1
          }]
        }}
      />

      </>

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
