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

export function fetchCrimes(lat, lng, date) {

  return function(dispatch) {
    dispatch(crimeRequest(lat, lng, date))

    return axios.get(
      `https://data.police.uk/api/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`
    ).then(
      res => res.data,
      err => console.log('err: ', err)
    ).then(crime =>
      dispatch(recieveCrime(crime))
    )

  }
}
