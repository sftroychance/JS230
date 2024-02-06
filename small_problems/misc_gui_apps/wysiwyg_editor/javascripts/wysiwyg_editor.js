$(document).ready(function() {
  $('#commands').on('click', 'button', function(e) {
    const command = $(this).data().command;

    let link;

    if (command === 'createLink') {
      link = prompt('What is the link address?');
      console.log('create link', link);
    }
    console.log(link);
    document.execCommand(command, false, link ?? '');
    $('#content p').get(0).focus();
  })
});
