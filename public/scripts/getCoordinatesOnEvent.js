// gets the coordinates of the event when a google map event happens.
// returns the coordinates as an object.
function getCoordinatesOnEvent (event) {

  let coordinates = {
    lat: event.latLng.lat(),
    lng: event.latLng.lng()
  }

  console.log( coordinates );
  return coordinates;
}