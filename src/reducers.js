import moment from 'moment'

const initialState = {
  lat: '51.4545',
  lng: '-2.5879',
  date: moment().subtract(2, 'months').format('YYYY-MM'),
  crime: [],
  message: '',
  fetching: false
}



export default function crimeGraph(state, action) {
  if(typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case 'CRIME_REQUEST':
      return Object.assign({}, state, {
        lng:  action.lng,
        lat:  action.lat,
        date: action.date,
        fetching: true,
        message: 'Fetching crime...'
      })
    case 'RECIEVE_CRIME':
      return Object.assign({}, state, {
        crime: action.crime,
        fetching: false,
        message: action.crime.length > 0 ? 'Crime recieved!' : 'No crime ...or too soon to say.'
      })
    case 'CRIME_FAIL':
      return Object.assign({}, state, {
        crime: [],
        fetching: false,
        message: action.message
      })
    default:
      return state

  }

}
