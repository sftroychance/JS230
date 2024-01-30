$(document).ready(function() {
  $('#thumbnails').on('click', 'a', function(e) {
    e.preventDefault();
    const $target = $(e.currentTarget);

    if ($target.closest('li').hasClass('active')) {
      return;
    }

    const targetID = $target.find('img').eq(0).attr('title').replace(' ', '');

    $('#main_slide figure:visible').fadeOut(300);
    $(`#${targetID}`).fadeIn(300);

    $('.active').toggleClass('active');
    $target.closest('li').toggleClass('active');
  });
});
