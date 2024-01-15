// Implement a function that tracks events on a web page by wrapping a callback function in a function that adds each event to a tracker object before invoking the callback. In other words, your function should take a callback function as an argument and return a new function that:

// Records the event, if the specific event hasn't been recorded before.
// Executes the original callback function.

// differences from LS solution:
// - didn't look at return value for 'tracker.clear()' which is the new length of the eventsList array
// - did not make `eventsList` private using IIFE
// - did not verify that event had not already been added before adding it
// - the given HTML did not include `stopPropagation()` in a couple event handlers that seemed to need it (to function as expected), but this was not an error; it was intentional to illustrate that we could keep the same event from being logged twice to the tracker.

// we could also add the 'alreadyAdded' functionality to prevent duplicate events to the
// tracker.add() method

// const tracker = {
//   eventsList: [],
//   list() {
//     return [...this.eventsList];
//   },
//   elements() {
//     return this.eventsList.map(event => event.target);
//   },
//   clear() {
//     this.eventsList.length = 0;
//     return this.eventsList.length;
//   },
//   add(event) {
//     this.eventsList.push(event);
//   },
// }

// revised per LS solution
const tracker = function createTracker() {
  const eventsList = [];
  return {
    list() {
      return [...eventsList];
    },
    elements() {
      return eventsList.map(event => event.target);
    },
    clear() {
      eventsList.length = 0;
      return eventsList.length;
    },
    add(event) {
      eventsList.push(event);
    },
  }
}();

function track(callback) {
  // revision per LS solution
  function alreadyAdded(event) {
    return tracker.list().includes(event);
  }

  return function(event) {
    if (!alreadyAdded(event)) {
      tracker.add(event);
    }

    callback(event);
  }
}

const divRed = document.querySelector('#red');
const divBlue = document.querySelector('#blue');
const divOrange = document.querySelector('#orange');
const divGreen = document.querySelector('#green');

divRed.addEventListener('click', track(event => {
  document.body.style.background = 'red';
}));

divBlue.addEventListener('click', track(event => {
  event.stopPropagation();
  document.body.style.background = 'blue';
}));

divOrange.addEventListener('click', track(event => {
  // event.stopPropagation();
  document.body.style.background = 'orange';
}));

divGreen.addEventListener('click', track(event => {
  // event.stopPropagation();
  document.body.style.background = 'green';
}));
