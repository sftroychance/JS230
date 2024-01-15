// 1
// Write a JavaScript function named delayLog that loops through the numbers
// from 1 to 10, and logs each number after that number of seconds. It should
// log 1 after 1 second, 2 after 2 seconds, etc. Note that the computation of
// the time is not dependent on when a previous number was logged. This means
// that for 10 numbers a total of 10 seconds would have passed.

// function delayLog() {
//   let iterations = Array.from({length: 10}, (_, idx) => idx + 1);

//   for (const iteration of iterations) {
//     setTimeout(() => {
//       console.log(iteration);
//     }, (iteration * 1000));
//   }
// }

// LS solution
// This solution defines the callback function separately
// actually, the callback is defined on each iteration by calling
// another function, makeLogger, that returns a function.

// I'm not sure the purpose of `let logger =` as opposed to just calling makeLogger
// within `setTimeout` -- maybe just to make it clearer?
// But I can see the purpose in defining the callback separately rather than inline
// with `setTimeout`

function makeLogger(number) {
  return function() {
   console.log(number);
  };
}

function delayLog() {
  for (let index = 1; index <= 10; index += 1) {
    let logger = makeLogger(index);
    setTimeout(logger, index * 1000);
  }
}
delayLog();

// 2
//In what sequence will the JavaScript runtime run the following lines of code? Number them from 1-8 to show the order of execution.

setTimeout(() => { // 1
  console.log('Once'); // 5
}, 1000);

setTimeout(() => { // 2
  console.log('upon'); // 7
}, 3000);

setTimeout(() => { // 3
  console.log('a'); // 6
}, 2000);

setTimeout(() => { // 4
  console.log('time'); // 8
}, 4000);

// 3
// In what sequence does the JavaScript runtime run the functions q, d, n, z, s,
// f, and g in the following code?

// f -> g -> d -> z -> n -> q -> s
// my errors:
// 1 - g will run before f because f won't run until the next event cycle
// 2 - s will run before q because s is running at 20 seconds and q is running at 25 seconds--you have to look at the values

// correct: g -> f -> d -> z -> n -> s -> q

setTimeout(() => {
  setTimeout(() => {
    q();
  }, 15);

  d();

  setTimeout(() => {
    n();
  }, 5);

  z();
}, 10);

setTimeout(() => {
  s();
}, 20);

setTimeout(() => {
  f();
});

g();

// 4
// Write a function named afterNSeconds that takes two arguments: a callback and
// a time duration in seconds. The function should wait for the indicated
// period, then invoke the callback function.

function afterNSeconds(callback, delaySeconds) {
  setTimeout(callback, delaySeconds * 1000);
}
