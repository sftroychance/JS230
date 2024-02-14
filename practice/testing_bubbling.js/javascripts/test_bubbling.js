$(document).ready(function() {
  document.querySelector('#one').addEventListener('click', function(e) {
    const three = document.querySelector('#three');
    if (e.target === three) {
      console.log('event defined on one, three clicked');
    }
  });

  document.querySelector('#two').addEventListener('click', function(e) {
    console.log('event defined on two, two or a descendant clicked');
  });
});
