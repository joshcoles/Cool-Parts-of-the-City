let map = {};
let pointsArr = [];
let markerArr = [];

function createNewMap () {
  var mapOptions = {
    center: new google.maps.LatLng(49.28, -123.11),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.addListener('click', function(e) {

    // placeMarkerAndPanTo(e.latLng, map);
    let thisMarker = marker(e.latLng, map);

    pointsArr.push({
      mkr: thisMarker,
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });

    markerArr.push(thisMarker);


    if (currentPointId > 0) {
      removeMarker(markerArr[0]);
    }

  });

  autoCompleteSearch(map);

  return map;
}