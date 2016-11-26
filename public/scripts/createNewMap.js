let map = {};
let markerArr = [];
let allMyGoddamnInfoWindows = [];

function createNewMap () {
  let mapOptions = {
    center: new google.maps.LatLng(49.28, -123.11),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.addListener('click', function(e) {
    let thisMarker = marker(e.latLng, map);
    markerArr.push(thisMarker);
  });

  autoCompleteSearch(map);

  return map;
}


function closeAllGoddamnInfoWindows() {
  while (allMyGoddamnInfoWindows.length > 0) {
    allMyGoddamnInfoWindows[0].close();
    allMyGoddamnInfoWindows.shift();
  }
}

function marker(latLng, map) {

  const markerOptions = {
    position: latLng,
    map: map,
    draggable: true
  };


  const $form = document.importNode($('.new-poi-form')[0], true); // duplicate DOM node because googleMaps
  const thisMarker = new google.maps.Marker(markerOptions);
  let infoWindow;

  function createMarker() {
    closeAllGoddamnInfoWindows();
    thisMarker.setMap(map);
    map.panTo(latLng);
    const infoWindowOptions = { content: $form };
    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    allMyGoddamnInfoWindows.push(infoWindow);
    infoWindow.open(map, thisMarker);
  }

  function markerClicked(event) {
    //closeAllGoddamnInfoWindows();
    const infoWindowOptions = { content: $form };
    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    allMyGoddamnInfoWindows.push(infoWindow);
    infoWindow.open(map, thisMarker);
  }

  function bindEvents() {
    google.maps.event.addListener(thisMarker, 'click', markerClicked);
    google.maps.event.addListener(thisMarker, 'dragend', markerClicked);
    //google.maps.event.addListener(map, 'click', mapClickedWhileInfoWindowIsUp);

    $('.submitInfoBox').on('click', function(e) {
      e.preventDefault();
      let $form = $(this).parent();
      let formData = {
        title: $form.find('input[name="title"]').val(),
        description: $form.find('input[name="description"]').val(),
        url: $form.find('input[name="url"]').val()
      };

      if (formData.title === "") formData.title = "xxx";
      if (formData.description === "") formData.description = "xxx";
      if (formData.url === "") formData.url = "xxx";

      indexInmarkerArr = searchForMarker(infoWindow.anchor);
      if (indexInmarkerArr > -1) {
        markerArr[indexInmarkerArr]['infoBox'] = formData;
      }
    });

  }

  function init() {
    createMarker();
    bindEvents();
  }

  init();
  return thisMarker;

};

function searchForMarker(marker) {
  var output = -1;
  markerArr.forEach((point, index) => {
    if (JSON.stringify(point.getPosition()) === JSON.stringify(marker.getPosition())) output = index;
  });
  return output;
}


// function removeMarker(marker) {
//   marker.setMap(null);
//   let index = searchForMarker(marker);
//   // markerArr[index].setMap(null);
//   if (index > -1) {
//     markerArr.splice(index, 1);
//     markerArr.splice(index, 1);
//   }
// }