<<<<<<< HEAD

function renderMap(y){
  console.log('x', y);

=======
>>>>>>> origin
// var createMap = require('./createMap');
// var insertPointsOnMap = require ('./insertPointsOnMap');

function renderMap(){

  var map;
  var marker;

  map = createMap(49.2812,-123.1105, 14);
  marker = insertPointsOnMap(map, 49.2812,-123.1105);

  google.maps.event.addListener(marker, 'click', getCoordinatesOnEvent);

  google.maps.event.addListener(marker, 'dragend', getCoordinatesOnEvent);

<<<<<<< HEAD
  map.addListener('click', function(e) {
          placeMarkerAndPanTo(e.latLng, map);
         });
=======
  // map.addListener('click', function(e) {
  //         placeMarkerAndPanTo(e.latLng, map);
  //        });
>>>>>>> origin

}