// var createMap = require('./createMap');
// var insertPointsOnMap = require ('./insertPointsOnMap');

let currentMap;
let pointsArr = [];

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
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  currentMap = new google.maps.Map(document.getElementById('map'), mapOptions);

  pointsData.forEach((point) => {
    insertPointsOnMap (currentMap, point);
  });
  return map;
}

function insertPointsOnMap (myMap, point) {
    let markerOptions = {
      position: new google.maps.LatLng(point.lat, point.lng),
      draggable: true,
      id: point.id
    };

    let infoWindowOptions = {
      content: markerOptions.id
    }

    let marker = new google.maps.Marker(markerOptions);
    marker.setMap(myMap);
    setUpEventListeners(marker);
    pointsArr.push(marker);

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker,'click', function() {
      infoWindow.open(myMap, marker);
    });

    return marker;
}


function setUpEventListeners (marker) {
  google.maps.event.addListener(marker, 'click', updatePointsArr);
  google.maps.event.addListener(marker, 'dragend', updatePointsArr);

  function updatePointsArr (event) {
    let index = searchForPointBy(this.id);
    pointsArr[index] = this;
    console.log("AFTER: ", pointsArr[2].getPosition().lat(), pointsArr[2].getPosition().lng());
    return 0;
  }
}

function searchForPointBy(id) {
  let output = -1;
  pointsArr.forEach((marker, index) => {
    if (marker.id === id) output = index;
  });
  return output;
}

 var panorama;
    function initialize() {
      panorama = new google.maps.StreetViewPanorama(
          document.getElementById('street-view'),
          {
            position: {lat: 49.2776612, lng: -123.1081074},
            pov: {heading: 165, pitch: 0},
            zoom: 1
          });
    }
  initialize();
