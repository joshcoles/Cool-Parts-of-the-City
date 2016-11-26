let map = {};
let markerArr = [];
let allMyGoddamnInfoWindows = [];
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
    let thisMarker = marker(e.latLng, map);
    markerArr.push(thisMarker);
  });

  autoCompleteSearch(map);

  pointsData.forEach((point) => {
    insertPointsOnMap (map, point);
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
    markerArr.push(marker);

    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    google.maps.event.addListener(marker,'click', function() {
      infoWindow.open(myMap, marker);
    });

    return marker;
}


function setUpEventListeners (marker) {
  google.maps.event.addListener(marker, 'click', updatemarkerArr);
  google.maps.event.addListener(marker, 'dragend', updatemarkerArr);

  function updatemarkerArr (event) {
    let index = searchForPointBy(this.id);
    markerArr[index] = this;
    console.log("AFTER: ", markerArr[2].getPosition().lat(), markerArr[2].getPosition().lng());
    return 0;
  }
}

function searchForPointBy(id) {
  let output = -1;
  markerArr.forEach((marker, index) => {
    if (marker.id === id) output = index;
  });
  return output;
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


