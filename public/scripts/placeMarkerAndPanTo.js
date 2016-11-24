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
