// 1. Rewrite the downloadFile callback function from the last practice problem
// as a new promise-based function called downloadFilePromise. Instead of using
// a callback, it should return a promise that resolves with the message
// "Download complete!" after a delay.

// to recall:
// function downloadFile(callback) {
//   console.log('Downloading file...');

//   setTimeout(() => {
//     callback('Download complete');
//   }, 1500);
// }

let message = new Promise((resolve) => {
  console.log('Downloading file...');

  setTimeout(() => {
    resolve('Download complete!');
  }, 1500);
});

// 2. Convert the processData function from the last practice problem into a new
// function named processDataPromise that uses promises. This function should
// return a promise that processes an array of numbers after a delay, utilizing
// the .then() method for logging the altered array.

// function processData(numbers, callback) {
//   function processCallback() {
//     console.log(numbers.map(callback));
//   }

//   setTimeout(processCallback, 1000);
// }

function processDataPromise(numbers) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(numbers.map(number => number * 2));
    }, 1000);
  })
}

// Example usage:
processDataPromise([1, 2, 3]).then((processedNumbers) => {
  console.log(processedNumbers);
  // After 1 second, logs: [2, 4, 6]
});

// 3. Create a promise called flakyService that simulates a service that
// sometimes fails. The promise should resolve with "Operation successful" or
// reject with "Operation failed" randomly. Use .then() for a successful
// operation log and .catch() for logging a failed operation.

new Promise((resolve, reject) => {
  let success = Math.floor(Math.random() * 2);

  if (success) {
    resolve('Operation successful');
  } else {
    reject('Operation failed');
  }
})
  .then(function(successMessage) {
    console.log(successMessage);
  })
  .catch(function(failMessage) {
    console.log(failMessage);
  });

// 4. Imagine a situation where you need to clean up resources (e.g., close a
// file) whether an operation succeeds or fails. Create a promise that resolves
// with "Operation complete" and demonstrate how to perform cleanup after the
// operation completes by using .finally().

new Promise((resolve) => {
  console.log('Operation started...')
  setTimeout(() => {
    resolve('Operation complete');
  }, 5000);
})
  .then(function(successMessage) {
    console.log(successMessage);
  })
  .finally(() => {
    console.log('Cleaning up resources.');
  });

// 5. Practice chaining promises by creating a promise chain that involves
// three promises. The first promise should resolve with a number, then the
// chain should double the number and add 5 in successive .then() calls. Log
// the result after the final operation.

new Promise((resolve) => {
  setTimeout(() => {
    resolve(25);
  }, 5000);
})
  .then(num => num * 2)
  .then(num => num + 5)
  .then(num => console.log(num));
