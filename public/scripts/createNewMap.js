let map = {};
let points = [];

function createNewMap () {
  var mapOptions = {
    center: new google.maps.LatLng(49.28, -123.11),
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.addListener('click', function(e) {

    // placeMarkerAndPanTo(e.latLng, map);
    marker(e.latLng, map);
    var  = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    points.push(marker_latLng);

    // var poiForm = createPoiForm(lat, lng);  // this is Josh's code?
    // poiForm.on('submit', function(event) {
    // })s

  });

  $('.info-window-form container form-group').on('submit', function (event) {
    var thisForm = $(this);
    var name = thisForm.find('#info-window-form-name').val();
    var description = thisForm.find('#info-window-form-description').val();
    var img_url = thisForm.find('#info-window-form-url').val();



  })

  autoCompleteSearch(map);

  return map;
}