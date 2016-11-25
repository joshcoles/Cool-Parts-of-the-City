function autoCompleteSearch (map) {
  let acOptions = {
    types: ['establishment']
  };
  let autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'));
  autocomplete.bindTo('bounds',map);
  let infoWindow = new google.maps.InfoWindow();
  let marker = new google.maps.Marker({
    map: map
  });

  google.maps.event.addListener(autocomplete, 'place_changed', function() {

    infoWindow.close();
    let place = autocomplete.getPlace();
    map.setCenter(place.geometry.location);

    //map.setZoom(14);
    // if (place.geometry.viewport) {
    //   map.fitBounds(place.geometry.viewport);
    //   console.log('asdasdasd');
    // } else {
    //   map.setCenter(place.geometry.location);
    //   console.log('qwwqeqweqweq');
    //   map.setZoom(14);
    // }

    marker.setPosition(place.geometry.location);
    infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
    infoWindow.open(map, marker);
    google.maps.event.addListener(marker,'click',function(e){

      infoWindow.open(map, marker);

    });
  });
}