// Sets up the relevant event listeners on a particular marker on the map.

function setUpEventListenenrs (marker) {
  google.maps.event.addListener(marker, 'click', getCoordinatesOnEvent);
  google.maps.event.addListener(marker, 'dragend', getCoordinatesOnEvent);
}