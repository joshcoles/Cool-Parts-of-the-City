function placeMarkerAndPanTo(latLng, map) {

  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    draggable: true,
  });

  marker.info = new google.maps.InfoWindow({
    content: '<IMG BORDER="0" ALIGN="Left" SRC="stagleton.jpg"> My name is ' + name
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);

  })
  map.panTo(latLng);
}




//==================

// function createMarker(name, latlng, mapsent)
// {
//     var marker = new google.maps.Marker({
//                        position: latlng,
//                        map: mapsent,
//                        title: name
//                        });
//     marker.info = new google.maps.InfoWindow({
//               //when I add <IMG BORDER="0" ALIGN="Left" SRC="stagleton.jpg"> the maps will not load
//       content: <IMG BORDER="0" ALIGN="Left" SRC="stagleton.jpg"> "My name is " + name

//     });

//     google.maps.event.addListener(marker, 'click', function(){
//         marker.info.open(mapsent, marker);
//     });
//     return marker;
// }