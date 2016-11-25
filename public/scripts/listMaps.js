$(function () {
  function listMaps() {
    let listOfMaps = window.data;
    let displayBox = $("#displayBox");

    listOfMaps.forEach((item) => {
      console.log(item);
      let listItem = $('<li>').text(`${item.id} --> ${item.keyword}`);
      displayBox.append(listItem);
    });
  }

  listMaps();
});