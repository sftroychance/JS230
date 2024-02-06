$(document).ready(function() {
  $('#commands').on('click', 'button', function(e) {
    const command = $(this).data().command;

    let link;

    if (command === 'createLink') {
      link = prompt('What is the link address?');
      console.log('create link', link);
    }

    document.execCommand(command, false, link ?? '');

    toggleButtons();
    $('#content').get(0).focus();
  });

  $(document).on('selectionchange', toggleButtons);

  function toggleButtons() {
    const buttons = $('#commands').find('button');

    for (const button of buttons) {
      const $button = $(button);
      let command = $button.data().command;
      $button.toggleClass('selected', document.queryCommandState(command));
    }
  }
});
