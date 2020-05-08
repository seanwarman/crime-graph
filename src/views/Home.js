import React from 'react'
import { connect } from 'react-redux'
import { fetchCrimes } from '../actions'
import { Bar } from 'react-chartjs-2'
import './Home.css'
import { Map, Marker, TileLayer } from 'react-leaflet'
import moment from 'moment'

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
    let lng  = key !== 'lng'  ? this.props.lng  : value
    let lat  = key !== 'lat'  ? this.props.lat  : value
    let date = key !== 'date' ? this.props.date : moment().subtract(value, 'months').format('YYYY-MM')

    this.setState({lng, lat})

    this.props.fetchCrimes(lat, lng, date)

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

          <select 
            id="date"
            name="datepicker"
            onChange={e => this.handleChange('date', e.target.value)}
          >
            <option value={1}>Last month</option>
            <option value={2}>Two months ago</option>
            <option value={3}>Three months ago</option>
            <option value={4}>Four months ago</option>
            <option value={5}>Five months ago</option>
            <option value={6}>Six months ago</option>
          </select>
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
