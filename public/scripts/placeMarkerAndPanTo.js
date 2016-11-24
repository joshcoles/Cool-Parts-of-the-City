// When map is clicked, it inserts a new point on the map
// Then it sets the corresponding event listeners on that point.

function placeMarkerAndPanTo(latLng, map) {
  let marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: true
  });
  map.panTo(latLng);
  setUpEventListenenrs(marker);
  return marker;
}