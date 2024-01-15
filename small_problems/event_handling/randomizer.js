// Write a randomizer function that accepts n callbacks and calls each callback
// at some random point in time between now and 2 * n seconds from now. For
// instance, if the caller provides 5 callbacks, the function should run them
// all sometime within 10 seconds.

// While running, randomizer should log the elapsed time every second: 1, 2, 3,
// ..., 2 * n.

// notes on my solution:
// - used `setTimeout` for printing elapsed time, but since we are repeating the
// same callback at each interval, `setInterval` would be more appropriate here, although
// the result might be the same

// - to use `setInterval`, we need to capture the timer in order to clear the interval
// when we reach the (2 * n)-second point

function randomizer(...callbacks) {
  const secondsEnd = callbacks.length * 2;

  // for (let timer = 1; timer <= secondsEnd; timer += 1) {
  //   setTimeout(() => console.log(timer), timer * 1000);
  // }

  let secondsElapsed = 0;
  const timedLogger = setInterval(() => {
    secondsElapsed += 1;
    console.log(secondsElapsed);

    if (secondsElapsed >= secondsEnd) {
      clearInterval(timedLogger);
    }
  }, 1000);

  for (const callback of callbacks) {
    const delay = (Math.floor(Math.random() * secondsEnd)) * 1000;
    // Math.floor isn't necessary here--it's part of our habit with getting a random
    // number; the delay doesn't have to be an exact second value
    // e.g., if Math.random() returns 0.11, the delay will be 2200, which is ok.
    setTimeout(callback, delay);
  }
}


function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);

// Output:
// 1
// 2
// "callback2"
// 3
// "callback3"
// 4
// 5
// "callback1"
// 6
