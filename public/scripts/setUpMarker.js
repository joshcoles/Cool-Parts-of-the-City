let allMyGoddamnInfoWindows = [];

function closeAllGoddamnInfoWindows() {
  while (allMyGoddamnInfoWindows.length > 0) {
    allMyGoddamnInfoWindows[0].close();
    allMyGoddamnInfoWindows.shift();
  }
}

function marker(lat, lng, map, name, description, url) {
  const latLng = new google.maps.LatLng(lat, lng);
  const markerOptions = {
    position: latLng,
    map: map,
    draggable: true
  };

  const $form = document.importNode($('.new-poi-form')[0], true); // duplicate DOM node because googleMaps


  const thisMarker = new google.maps.Marker(markerOptions);
  //let $form;
  let infoWindow;

  // if (name === true) {
  //   $form = `
  //     <span class="info-window-form container form-group new-poi-form">
  //       <input class="form-control input-sm xx" id="info-window-form-name" type="text" name="title" placeholder="title"><br>
  //       <input class="form-control input-sm yy" id="info-window-form-description" type="text" name="description" placeholder="description"><br>
  //       <input class="form-control input-sm zz" id="info-window-form-url" type="text" name="url" placeholder="img url"><br>
  //       <input class="submitInfoBox button btn-success btn-md" type="submit">
  //     </span> `;

  // } else {
  //   let infoBoxName = name;
  //   let infoBoxDesc = description;
  //   let infoBoxUrl = url;

  //   $form = `
  //     <span class="info-window-form container form-group new-poi-form">
  //       <input class="form-control input-sm xx" id="info-window-form-name" type="text" name="title" value=${name}><br>
  //       <input class="form-control input-sm yy" id="info-window-form-description" type="text" name="description" value=${name}><br>
  //       <input class="form-control input-sm zz" id="info-window-form-url" type="text" name="url" value=${name}><br>
  //       <input class="submitInfoBox button btn-success btn-md" type="submit">
  //     </span> `;
  // }


  function createMarker() {
    closeAllGoddamnInfoWindows();
    thisMarker.setMap(map);
    map.panTo(latLng);
    const infoWindowOptions = { content: $form };
    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    allMyGoddamnInfoWindows.push(infoWindow);
    //infoWindow.open(map, thisMarker);


    google.maps.event.addListener(infoWindow, 'domready', () => {
      //console.log("info window: ", $('infoWindow.content #info-window-form-name'));
      document.getElementById("info-window-form-name").value = name;
      document.getElementById("info-window-form-description").value = description;
      document.getElementById("info-window-form-url").value = url;

    });

    google.maps.event.addListener(thisMarker, 'click', markerClicked);
    //google.maps.event.addListener(thisMarker, 'dragend', markerClicked);
    console.log("setting up listener on: ", thisMarker);

    $('.submitInfoBox', $form).on('click', function(e) {
      e.preventDefault();
      console.log("update being clicked: ", this);
      let $form = $(this).parent().parent();
      let formData = {
        title: $form.find('input[name="title"]').val(),
        description: $form.find('input[name="description"]').val(),
        url: $form.find('input[name="url"]').val()
      };


      indexInmarkerArr = searchForMarker(infoWindow.anchor);
      if (indexInmarkerArr > -1) {
        markerArr[indexInmarkerArr]['infoBox'] = formData;
      }
      closeAllGoddamnInfoWindows();
    });

    $('.deleteMarker', $form).on('click', function(e) {
      e.preventDefault();
      console.log("delete being clicked: ", this);
      removeMarker(infoWindow.anchor);
      // let $form = $(this).parent().parent();
      // let formData = {
      //   title: $form.find('input[name="title"]').val(),
      //   description: $form.find('input[name="description"]').val(),
      //   url: $form.find('input[name="url"]').val()
      // };


      // indexInmarkerArr = searchForMarker(infoWindow.anchor);
      // if (indexInmarkerArr > -1) {
      //   markerArr[indexInmarkerArr]['infoBox'] = formData;
      // }
      closeAllGoddamnInfoWindows();
    });




  }

  function markerClicked(event) {
    closeAllGoddamnInfoWindows();
    const infoWindowOptions = { content: $form };
    infoWindow = new google.maps.InfoWindow(infoWindowOptions);
    allMyGoddamnInfoWindows.push(infoWindow);
    infoWindow.open(map, thisMarker);
  }


  createMarker();
  //setTimeout(createMarker, 500);
  return thisMarker;

};

function searchForMarker(marker) {
  var output = -1;
  markerArr.forEach((point, index) => {
    if (JSON.stringify(point.getPosition()) === JSON.stringify(marker.getPosition())) output = index;
  });
  return output;
}


function removeMarker(marker) {
  marker.setMap(null);
  let index = searchForMarker(marker);
  if (index > -1) {
    markerArr.splice(index, 1);
  }
}


// if (formData.title === "") formData.title = "xxx";
// if (formData.description === "") formData.description = "xxx";
// if (formData.url === "") formData.url = "xxx";

// function bindEvents() {
  //   google.maps.event.addListener(thisMarker, 'click', markerClicked);
  //   google.maps.event.addListener(thisMarker, 'dragend', markerClicked);
  //   //google.maps.event.addListener(map, 'click', mapClickedWhileInfoWindowIsUp);

  //   $('.submitInfoBox').on('click', function(e) {
  //     e.preventDefault();
  //     let $form = $(this).parent();
  //     let formData = {
  //       title: $form.find('input[name="title"]').val(),
  //       description: $form.find('input[name="description"]').val(),
  //       url: $form.find('input[name="url"]').val()
  //     };

  //     // if (formData.title === "") formData.title = "xxx";
  //     // if (formData.description === "") formData.description = "xxx";
  //     // if (formData.url === "") formData.url = "xxx";

  //     indexInmarkerArr = searchForMarker(infoWindow.anchor);
  //     if (indexInmarkerArr > -1) {
  //       markerArr[indexInmarkerArr]['infoBox'] = formData;
  //     }

  //     closeAllGoddamnInfoWindows();
  //   });
  // }

  // function init() {
  //   createMarker();
  //   bindEvents();
  // }

  //init();