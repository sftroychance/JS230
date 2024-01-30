$(document).ready(function() {
  console.log('ready');

  $('#team a').on('click', 'figure', function(e) {
    e.preventDefault();
    e.stopPropagation();

    const fullName = e.currentTarget.dataset.name;
    const firstName = fullName.split(' ')[0].toLowerCase();
    const imgSource = `images/img_${firstName}.jpg`;

    $('#modal figure img').attr('src', imgSource);
    $('#modal figcaption').text(fullName);

    $('#overlay').fadeIn();
    $('#modal').fadeIn();
  });

  $('#close_modal').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#modal').fadeOut();
    $('#overlay').fadeOut();
  });

  $(document).on('click', function(e) {
    $('#modal').fadeOut();
    $('#overlay').fadeOut();
  });

  $('#modal').on('click', function(e) {
    e.stopPropagation();
  })

  $(document).on('keyup', function(e) {
    if (e.code === 'Escape') {
      $('#modal').fadeOut();
      $('#overlay').fadeOut();
    }
  })
});
