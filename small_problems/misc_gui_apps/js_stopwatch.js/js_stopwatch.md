# Project Notes

## Project Name
JavaScript Stopwatch

## Description
Create a stopwatch application.

Specifications

The Timer

The stopwatch timer should have four 2-digit counters:

hours (00-99)
minutes (00-59)
seconds (00-59)
centiseconds (00-99)
All counters should use a leading zero when the corresponding time value is less than 10.

Note that 1 centisecond is 1/100th of a second or 10 milliseconds.

The Controls

The stopwatch should have the following controls:

a Start/Stop button
a Reset button
Functionality

When the user clicks the Start button:

The text on the button changes to Stop.
The timer starts running the centiseconds counter.
When the centiseconds counter reaches 100, it resets to zero and the seconds counter starts incrementing.
When the seconds counter reaches 60, it resets to zero and the minutes counter starts incrementing.
When the minutes counter reaches 60, it resets to zero and the hour counter starts incrementing.
When the user clicks the Stop button:

The timer stops.
The button text changes to Start.
When the user clicks the Reset button:

The timer stops running if it is already running.
The timer resets all counters to 00.

## HTML
h1
div container
  p element
  - 4 span elements (colons and periods in between)
stop/start button
reset button

## CSS
style text like digital clock - monospace

## JS
page load:
- timer set to 00:00:00.00

event listeners
- start/stop button

- reset

start timer:
  set csec, sec, min, hour = 0

  1 csec = 10 ms
  1 sec = 1000 msec = 100 csec
  1 min = 60000 msec = 6000 csec
  1 hour = 3600000 msec = 360000 csec

  setInterval to increment counter every 10ms
  counter += 10
  csec = counter

let counter = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

const csec = $('#csec');
const sec = $('#sec');
const min = $('#min');
const hour = $('#hour');

setInterval(() => {
  counter += 1;
  if (counter >= 100) {
    counter = 0;
    seconds += 1;
  }

  if (seconds >= 60) {
    minutes += 1;
  }

  if (minutes >= 60) {
    hours += 1;
  }

  renderTime();
}, 10);

function renderTime() {
  $csec.html(String(counter).padStart(3, '0'));
  $sec.html(String(seconds).padStart(2, '0'));
  $min.html(String(minutes).padStart(2, '0'));
  $hours.html(String(hours).padStart(2, '0'));
}
Q:
are we doing anything to account for setTimout/setInterval not necessarily running on the exact interval? or is the centisecond value enough of a buffer for this?

# further:
The demo app may run slow on most systems. On the author's system, the timer runs about 5 seconds slow every real minute. Why do you think that is? Does your version of the timer also run slow? See if you can fix the app to make it run at the same speed as the real clock.

This is because the interval delay is only a minimum time until the event recurs; the callback is placed into the message queue, and it might not be executed right away, and this lag builds up over time to affect our stopwatch output.

how to fix this?
Every 10ms, set the counter to equal the time since the start button was pushed to the current time. `Date.now() - startTime`
- when start is hit (to pause); save the elapsed time `holdOver` to be added when the timer restarts

Even if the callback is slightly delayed, the values rendered to the screen always reflect the elapsed clock time. (checked with `console.time` at start and `console.timeEnd()` when stop is pushed)
