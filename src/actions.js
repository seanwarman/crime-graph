import axios from 'axios'

export function crimeRequest(lat, lng, date) {
  return {
    type: 'CRIME_REQUEST',
    lat, lng, date
  }

}

export function recieveCrime(crime) {
  return {
    type: 'RECIEVE_CRIME',
    crime
  }
}

export function crimeReqFailed(message) {
  return {
    type: 'CRIME_FAIL',
    message
  }
}

export function fetchCrimes(lng, lat, date) {

  return function(dispatch) {
    dispatch(crimeRequest(lng, lat, date))

    return axios.get(
      `https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-08`
    ).then(
      res => res.data,
      err => console.log('err: ', err)
    ).then(crime =>
      dispatch(recieveCrime(crime))
    )

  }
}
