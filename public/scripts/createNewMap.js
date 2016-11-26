let map = {};
let points = [];

function createNewMap () {
  var mapOptions = {
    center: new google.maps.LatLng(49.28, -123.11),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.addListener('click', function(e) {
    // placeMarkerAndPanTo(e.latLng, map);
    marker(e.latLng, map);
    points.push({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    });
  });

  autoCompleteSearch(map);

  return map;
}