let character;

$('a').on('click', function(e) {
  e.preventDefault();
  $('#accordion').slideToggle();
});

$('form').on('submit', function(e) {
  e.preventDefault();
  character = $('input').val();

  // we can't define this event handler until we know the character
  // first we must unbind any previously defined keypress event
  $(document).off('keypress').on('keypress', function(e) {
    if (e.key !== character) {
      return;
    }

    $('a').trigger('click');
  });
});
