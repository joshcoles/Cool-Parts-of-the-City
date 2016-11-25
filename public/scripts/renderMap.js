// var createMap = require('./createMap');
// var insertPointsOnMap = require ('./insertPointsOnMap');

function renderMap(){
  var map;
  var marker;
  let mapData = (window.mapData);
  // $.get('/renderMap').success(function (data) {
  //   JSON.parse(data);
  //   console.log(data);
  // });

  map = drawMap(mapData.mapCenterLat,
                mapData.mapCenterLng,
                mapData.mapZoom, []);

  // marker = insertPointsOnMap(map, 49.2812,-123.1105);
}