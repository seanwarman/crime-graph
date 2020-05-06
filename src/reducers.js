const initialState = {
  lat: null,
  lng: null,
  date: '2019-08',
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
        message: ''
      })
    case 'RECIEVE_CRIME':
      return Object.assign({}, state, {
        crime: action.crime,
        fetching: false,
        message: 'Crime recieved!'
      })
    case 'CRIME_FAIL':
      return Object.assign({}, state, {
        crime: [],
        fetching: false,
        message: 'Crime not available!'
      })
    default:
      return state

  }

}
