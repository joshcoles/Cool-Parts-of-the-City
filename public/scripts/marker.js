function marker(latLng, map) {

  const markerOptions = {
    position: latLng,
    map: map,
    draggable: true
  };

  const $form = $('form')[0];
  const thisMarker = new google.maps.Marker(markerOptions);
  let infoWindow;

  // palces a marker on map and pans to it.
  function createMarker() {
    thisMarker.setMap(map);
    map.panTo(latLng);
  }

  // HELPER
  // =======
  // gets coordinates of a marker event
  function getCoordinates(event) {
    return {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
  }

  // EVENTS
  // =======

  // opens an info window when a maker is clicked.
  function markerClicked(event) {
    const infoWindowOptions = {
      content: $form
    };
    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    infoWindow.open(map, thisMarker);
    // console.log(event.latLng.lat());
  }

  // it will close down any open info windows when another part of map is clicked.
  function mapClickedWhileInfoWindowIsUp(event) {
    // marker.hide();
    if (infoWindow) {
    infoWindow.close();
    }
  }

  // binds the map listener events and assigns them functions.
  function bindEvents() {
    google.maps.event.addListener(thisMarker, 'click', markerClicked);
    google.maps.event.addListener(thisMarker, 'dragend', markerClicked);
    google.maps.event.addListener(map, 'click', mapClickedWhileInfoWindowIsUp);

    $('body').submit('#map form', function(e) {
      e.preventDefault();
      let $form = $(this).find('#map form');
      let formData = {
        description: $form.find('input[name="description"]').val()
      };
      // console.log(formData);

      $.post('/markers', formData).done(function(marker) {

      });
    });
  }

  // initializes the marker.
  function init() {
    createMarker();
    bindEvents();
  }

  init();

  return thisMarker;

};


function removeMarker(marker) {
  marker.setMap(null);
  let index = markerArr.indexOf(marker);
  markerArr[index].setMap(null);

  if (index > -1) {
    markerArr.splice(index, 1);
    pointsArr.splice(index, 1);
  }
  console.log(markerArr);
  console.log(pointsArr);
}

function searchForMarker(marker) {
  pointsArr.forEach((point, index) => {
    if (point.mkr === marker) return index;
  });
  return -1;
}


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





