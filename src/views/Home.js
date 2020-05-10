import React from 'react'
import { connect } from 'react-redux'
import { updateParams, fetchCrimes, chooseSelectedCat, resetState } from '../actions'
import { Bar, Pie } from 'react-chartjs-2'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import locations from '../mixins/locations';
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

  componentWillUnmount() {
    this.props.resetState()
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

  }

  handleLocation(val) {

    let { lat, lng } = locations[val]
    this.props.fetchCrimes(lat, lng, this.props.date, 12)

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
          <div className="col-2">
            <h1>Crime Graph</h1>
            <p>
              Drag the map to any location and click <b>Get Crime</b><br />
              Choose any of the chart's bars to filter crime by type
            </p>
          </div>
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

              <select 
                id="locations"
                name="locations"
                defaultValue={'Bristol'}
                style={{marginLeft: 5}}
                onChange={e => this.handleLocation(e.target.value)}
              >
                {
                  Object.keys(locations).map(town => (

                    <option key={town} value={town}>{town.replace(/_/g, ' ')}</option>

                  ))
                }
              </select>
            </div>
            </div>
            <div className="col-4" style={{textAlign: 'right'}}>
              <button
                disabled={this.props.fetching}
                onClick={e => {
                  e.preventDefault()
                  this.props.fetchCrimes(this.props.lat, this.props.lng, this.props.date, this.props.zoom)

                }}
              >{this.props.fetching ? 'Fetching...' : 'Get Crime!'}</button>
            </div>
            <div className="col-2" style={{textAlign: 'center'}}>
            <div className="selected-category">
              <span
                onClick={() => this.props.chooseSelectedCat()}
              >
                {(this.props.selectedCat || 'All').split('-').map(word => word.slice(0,1).toUpperCase() + word.slice(1)).join(' ')}
                {
                  this.props.selectedCat && <span 
                    style={{ marginLeft: 5 }}
                  >X</span>
                }
              </span>
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
    crime:       state.crime,
    lng:         state.lng,
    lat:         state.lat,
    date:        state.date,
    zoom:        state.zoom,
    message:     state.message,
    selectedCat: state.selectedCat,
    locations:   state.locations,
    fetching:    state.fetching
  }),
  {
    updateParams, 
    fetchCrimes,
    resetState,
    chooseSelectedCat
  }
)(Home)
