import React from 'react'
import { connect } from 'react-redux'
import { updateParams, fetchCrimes, chooseSelectedCat } from '../actions'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { Bar, Pie } from 'react-chartjs-2'
import { Map, Marker, TileLayer, Tooltip, Popup } from 'react-leaflet'
import './Home.css'
import moment from 'moment'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.handleSelectCat = this.handleSelectCat.bind(this)
  }

  componentDidMount() {

    this.props.fetchCrimes(this.props.lat, this.props.lng, this.props.date, this.props.zoom)

  }

  labelsByCategory(crime) {
    if(!crime) return []

    return crime.reduce((arr,cr) => {

      if(arr.includes(cr.category)) return arr
      return [ ...arr, cr.category ]

    }, [])
  }

  dataByCategory(crime) {
    if(!crime) return []

    const categories = this.labelsByCategory(crime)

    return categories.map(cat => {
      return (crime.filter(cr => cr.category === cat) || []).length
    })

  }

  handleMapChange(e) {
    const bounds = e.sourceTarget.getBounds()
    const zoom = e.sourceTarget.getBoundsZoom(bounds)
    const { lat, lng } = bounds.getCenter()

    this.props.updateParams(lat, lng, this.props.date, zoom)


    // Dont re-fetch if the lat and lng haven't changed.
    // if(lat !== this.props.lat || lng !== this.props.lng) {
    //   this.props.fetchCrimes(lat, lng, this.props.date, zoom)
    // }

  }

  handleDate(num) {

    const date = moment().subtract(num, 'months').format('YYYY-MM')

    this.props.fetchCrimes(this.props.lat, this.props.lng, date, this.props.zoom)

  }

  handleSelectCat(e) {

    if((e[0] || {})._model) {
      this.props.chooseSelectedCat(e[0]._model.label)
    }

  }

  filterCrimeByCat(crime) {

    if(this.props.selectedCat) crime = crime.filter(cr => (
      cr.category === this.props.selectedCat
    ))

    return crime

  }

  render() {

    return (
      <div>
        <div className="row">
          <div className="col-2"><h1>Crime Graph</h1></div>
          <div className="col-2"><h2>{this.props.selectedCat}</h2></div>
        </div>
        <div className="row">
          <div className="col-4">
            <div style={{
              marginBottom: '20px'
            }}>

              <select 
                id="date"
                name="datepicker"
                defaultValue={2}
                onChange={e => this.handleDate(e.target.value)}
              >
                <option value={2}>Two months ago</option>
                <option value={3}>Three months ago</option>
                <option value={4}>Four months ago</option>
                <option value={5}>Five months ago</option>
                <option value={6}>Six months ago</option>
                <option value={7}>Seven months ago</option>
                <option value={8}>Eight months ago</option>
                <option value={9}>Nine months ago</option>
                <option value={10}>Ten months ago</option>
              </select>
            </div>
            </div>
            <div className="col-4" style={{textAlign: 'right'}}>
              <button
                onClick={e => {
                  e.preventDefault()
                  this.props.fetchCrimes(this.props.lat, this.props.lng, this.props.date, this.props.zoom)

                }}
              >Get Crime!</button>
            </div>
            <div className="col-2" style={{textAlign: 'center'}}>
            <div
              style={{
                marginBottom: '20px'
              }}
            >
            {this.props.message}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-2">
            <Map center={[this.props.lat, this.props.lng]} 
              minZoom={10}
              zoom={this.props.zoom}
              onMoveend={e => this.handleMapChange(e)}
              onZoomend={e => this.handleMapChange(e)}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              ></TileLayer>


              {
                this.filterCrimeByCat((this.props.crime || [])).map(cr => {
                  return <Marker
                    key={cr.id}
                    position={[
                      cr.location.latitude,
                      cr.location.longitude
                    ]}
                  >
                    <Popup>
                      <p>{cr.category.split('-').map(word => word.slice(0,1).toUpperCase() + word.slice(1)).join(' ')}</p>
                      <p>{cr.location.street.name}</p>
                    </Popup>
                  </Marker>
                })
              }
            </Map>
          </div>
          <div className="col-2 bar-chart">
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
              getElementAtEvent={this.handleSelectCat}
              options={{
                startAtZero: true
              }}
            ></Bar>
          </div>
        </div>

      </div>

    )
  }
}

export default connect(
  state => ({ 
    crime:   state.crime,
    lng:     state.lng,
    lat:     state.lat,
    date:    state.date,
    zoom:    state.zoom,
    message: state.message,
    selectedCat: state.selectedCat
  }),
  {
    updateParams, 
    fetchCrimes,
    chooseSelectedCat
  }
)(Home)
