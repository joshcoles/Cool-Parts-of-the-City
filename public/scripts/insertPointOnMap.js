// Takes a google map, a latitude and a longitude
// an inserts the corresponding point on the given map
function insertPointsOnMap (myMap, lat, lng) {
    var markerOptions = {
      position: new google.maps.LatLng(lat, lng),
      draggable: true
    };

    var infoWindowOptions = {
      content: 'test'
    }

    debugger;
    var marker = new google.maps.Marker(markerOptions);
    marker.setMap(myMap);
    console.log(myMap);


    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker,'click', function() {
      console.log("I'm firing my lazer");
      infoWindow.open(myMap, marker);
    });

    setUpEventListeneners(marker);

    return marker;
}

