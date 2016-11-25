function marker(latLng, map) {

  const markerOptions = {
    position: latLng,
    map: map,
    draggable: true
  };

  const $form = $('form')[0];
  const marker = new google.maps.Marker(markerOptions);
  let infoWindow;
  // const infoWindow = new google.maps.InfoWindow(infoWindowOptions);

  function createMarker() {
    marker.setMap(map);
    map.panTo(latLng);
  }

  // HELPER
  // =======

  function getCoordinates(event) {
    return {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
  }

  // EVENTS
  // =======

  function markerClicked(event) {

    const infoWindowOptions = {
      content: $form
    };

    infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    infoWindow.open(map, marker);
  }

  function mapClickedWhileInfoWindowIsUp(event) {
    // marker.hide();
    if (infoWindow) {
    infoWindow.close();
    }
  }


  function bindEvents() {
    google.maps.event.addListener(marker, 'click', markerClicked);
    google.maps.event.addListener(marker, 'dragend', markerClicked);
    google.maps.event.addListener(map, 'click', mapClickedWhileInfoWindowIsUp);



    $('body').submit('#map form', function(e) {
      e.preventDefault();
      let $form = $(this).find('#map form');
      let formData = {
        description: $form.find('input[name="description"]').val()
      };
      console.log(formData);

      $.post('/markers', formData).done(function(marker) {

      });
    });
  }

  function init() {
    createMarker();
    bindEvents();
  }

  init();

};



// function placeMarkerAndPanTo(latLng, map) {



//  // map.panTo(latLng);
//     setUpEventListeners(marker);
//  // return marker;
//     // debugger;



//     var infoWindowOptions = {
//       content: 'test'
//     }



//     console.log(map);


//     var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

//     google.maps.event.addListener(marker,'click', function() {
//       console.log("I'm firing my lazer");
//       infoWindow.open(map, marker);
//     });

//     setUpEventListeneners(marker);

//     return marker;
// }





