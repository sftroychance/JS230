$(document).ready(function() {
  $('#addItem').on('click', function() {
    const item = $('[name="item"]').val();
    if (item === '') {
      return;
    }

    const quantity = +$('[name="quantity"]').val();

    const itemText = `${quantity ? quantity : 1} ${item}`;
    $('#groceryList').append(`<li>${itemText}</li>`);

    // alternatively
    // const $listItem = $('<li>').text(`${quantity ? quantity : 1} ${item}`);
    // $('#groceryList').append($listItem);

    $('form').get(0).reset();
  });
});
