export function fetchCrime(lat, lng, date) {
  return {
    type: 'FETCH_CRIME',
    lat, lng, date
  }
}
