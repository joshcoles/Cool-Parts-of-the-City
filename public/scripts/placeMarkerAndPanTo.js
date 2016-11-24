function placeMarkerAndPanTo(latLng, map) {
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: true
  });
  map.panTo(latLng);
}