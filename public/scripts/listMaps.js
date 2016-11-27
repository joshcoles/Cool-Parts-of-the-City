$(function () {
  function listMaps() {
    // $.post('/listMapss', '135', function () {console.log('success')} );
    let listOfMaps = window.data;
    let displayBox = $("#displayBox");

    displayBox.on('click', '.mapListButtons', function (event) {
      event.preventDefault();
      console.log(this.getAttribute('data-button'));
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
        <button class='mapListButtons' type='button' data-button=${item.id}>${item.title}</button><br>
        `);
      displayBox.append($button);
    });
  }
  listMaps();
});



