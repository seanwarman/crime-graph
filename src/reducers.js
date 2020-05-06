const initialState = {
  lat: null,
  lng: null,
  date: '2019-08'
}




export default function crimeGraph(state, action) {
  if(typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {
    case 'FETCH_CRIME':
      return Object.assign({}, state, {
        lng:  action.lng,
        lat:  action.lat,
        date: action.date
      })
    default:
      return state

  }

}
