// Takes a latitude, longitude and a zoom level
// returns a map centered on the given point with the given zoom level.
function createMap (lat, lng, zoomLevel) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: zoomLevel,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  return new google.maps.Map(document.getElementById('map'), mapOptions);
}