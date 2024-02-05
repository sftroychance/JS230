$(document).ready(function() {
  const $csec = $('#csec');
  const $sec = $('#sec');
  const $min = $('#min');
  const $hour = $('#hour');

  let timer;

  let counter = 0;
  let csec = 0;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let holdOver = 0;

  function incrementCounter() {
    timer = setInterval(() => {
      counter = holdOver + (Date.now() - startTime); // in msec
      renderTime();
    }, 10);
  }

  function renderTime() {
    hours = counter / 3600000;
    minutes = (counter % 3600000) / 60000;
    seconds = (counter % 60000) / 1000;
    csec = counter % 1000 / 10;

    // if (counter >= 100) {
    //   counter = 0;
    //   seconds += 1;
    // }

    // if (seconds >= 60) {
    //   seconds = 0;
    //   minutes += 1;
    // }

    // if (minutes >= 60) {
    //   minutes = 0;
    //   hours += 1;
    // }

    $csec.html(String(Math.round(csec)).padStart(2, '0'));
    $sec.html(String(Math.floor(seconds)).padStart(2, '0'));
    $min.html(String(Math.floor(minutes)).padStart(2, '0'));
    $hour.html(String(Math.floor(hours)).padStart(2, '0'));
  }

  function stopCounter() {
    clearInterval(timer);
  }

  function resetCounter() {
    clearInterval(timer);
    counter = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    holdOver = 0;
    renderTime();
    $('#start-stop').html('Start');
  }

  let startTime;
  $('#start-stop').on('click', function() {
    if (this.textContent === 'Start') {
      console.time();
      startTime = Date.now();
      incrementCounter();
      $(this).html('Stop');
    } else {
      console.timeEnd();
      holdOver = counter;
      $(this).html('Start');
      stopCounter();
    }
  });

  $('#reset').on('click', resetCounter);
});
