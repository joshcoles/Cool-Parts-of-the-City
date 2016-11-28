currentMapId = 148;

$(function () {
  function listMaps() {
    // $.post('/listMapss', '135', function () {console.log('success')} );
    let data = JSON.parse(window.data);
    let listOfMaps = data.list;
    //console.log(listOfMaps);
    let displayBox = $("#displayBox");

    displayBox.on('click', '.mapListButtons', function (event) {
      event.preventDefault();
      currentMapId = this.getAttribute('data-button');
      //console.log(this.getAttribute('data-button'));
      $.ajax({
        type: 'POST',
        url: '/listMaps',
        data: {mapId: this.getAttribute('data-button')},
        success: function (response) {
          console.log('success');
          if (response.redirect) {window.location.href = response.redirect;}
        }
      });

    });

    listOfMaps.forEach((item) => {
      let $button = $(`
        <a href="#" class="list-group-item mapListButtons" type="button" data-button=${item.id}>${item.title}</a>`);
      displayBox.append($button);
    });
  }
  listMaps();
});

 //<button class='mapListButtons' type='button' data-button=${item.id}>${item.title}</button><br>



