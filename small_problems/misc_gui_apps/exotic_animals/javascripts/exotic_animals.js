$(document).ready(() => {
  let fadeTimer;

  function showTooltip(e) {
    fadeTimer = setTimeout(() => {
      $(this).next('figcaption').fadeIn(300);
    }, 2000);
  }

  function hideTooltip() {
    if (fadeTimer) {
      clearTimeout(fadeTimer);
    }

    $(this).next('figcaption').fadeOut(300);
  }

  $('.grid').on('mouseenter', 'img', showTooltip);
  $('.grid').on('mouseout', 'img', hideTooltip);
});
