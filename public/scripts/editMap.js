// Takes a latitude, longitude and a zoom level
// returns a map centered on the given point with the given zoom level.

function editMap (lat, lng, zoomLevel) {
  var map;
  var marker;

  let points = [{
    lat: 49.2812,
    lng: -123.1105
  }];

  map = drawMap(49.2812,-123.1105, 14, points);

}