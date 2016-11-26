let map = {};
let markerArr = [];

let postRoute = '/users/:username/edit';

function editMap(){
  let data = JSON.parse(window.data);
  drawMap(data);
}

function drawMap (data) {
  let mapData = data.mapData;
  let pointsData = data.pointsData;

  let mapOptions = {
    center: new google.maps.LatLng(mapData.centre_x, mapData.centre_y),
    zoom: mapData.zoom,
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.addListener('click', function(e) {
    let thisMarker = marker(e.latLng.lat(), e.latLng.lng(), map);
    markerArr.push(thisMarker);
  });

  autoCompleteSearch(map);

  pointsData.forEach((point) => {
    let thisMarker = marker(point.lat, point.lng, map);
    markerArr.push(thisMarker);

  });

  var fenway = {lat: 42.345573, lng: -71.098326};
  var panorama = new google.maps.StreetViewPanorama(
    document.getElementById('pano'), {
      position: fenway,
      pov: {
        heading: 34,
        pitch: 10
      }
    });
    map.setStreetView(panorama);


  return map;
}