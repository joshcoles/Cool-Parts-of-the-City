// Takes a latitude, longitude and a zoom level
// returns a map centered on the given point with the given zoom level.

function drawMap (lat, lng, zoomLevel) {
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: zoomLevel,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  let templateVars = {
    lat: lat,
    lng: lng,
    zoom: zoomLevel
  };

  const url = '/maps/mapid/coordinates';
  // $.ajax({
  //   method: 'POST',
  //   url: "/newmap",
  //   data: templateVars,
  //   success: function (){
  //     console.log('SUCCESS');
  //   }
  // });
  let output = {
    map: new google.maps.Map(document.getElementById('map'), mapOptions),
    center: { lat: lat, lng: lng },
    zoom: zoomLevel
  }

  //return output;

  return new google.maps.Map(document.getElementById('map'), mapOptions);

}