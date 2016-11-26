let map = {};
let markerArr = [];
let postRoute = '/users/:username/create';

function createNewMap () {
  let mapOptions = {
    center: new google.maps.LatLng(49.28, -123.11),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.addListener('click', function(e) {
    let thisMarker = marker(e.latLng.lat(), e.latLng.lng(), map);
    markerArr.push(thisMarker);
  });

  autoCompleteSearch(map);

  return map;
}