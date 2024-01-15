// 1. Use the flakyService function from the last practice problem to handle
// errors gracefully by logging "An error occurred" in a .catch() block, instead
// of logging "Operation failed" directly.

function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject();
    }
  });
}

flakyService()
  .then((successMessage) => console.log(successMessage))
  .catch(() => console.log('An error occurred.'));

// 2 Suppose you are fetching user data from an API. Handle the error thrown by
// this fetchUserData function, catch it and log only the error message. Then,
// use .finally() to log "Fetching complete".

function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: "User not found" }), 500);
  });
}

fetchUserData()
  .catch((error) => console.log(error.error))
  .finally(() => console.log('Fetching complete'));

// 3 Implement a function retryOperation that attempts to perform an operation
// by calling a provided function operationFunc. If operationFunc throws an
// error, retryOperation should retry the operation up to two additional times
// before giving up and logging "Operation failed".

function retryOperation(callback) {
  let tries = 0;

  function attempt() {
    return callback().catch((error) => {
      if (tries < 2) {
        tries += 1;
        console.log(`retry attempt ${tries}`)
        return attempt();
      } else {
        throw error;
      }
    });
  }

  return attempt().catch(() => console.log('Operation failed'));

}

// Example usage:
retryOperation(
  () =>
    new Promise((resolve, reject) =>
      Math.random() > 0.33
        ? resolve("Success!")
        : reject(new Error("Fail!"))
    )
);

// 4 Imagine an async operation represented by mockAsyncOp promise that can
// either resolve or reject. You want to ensure that no matter the outcome, you
// log "Operation attempted". Provide an implementation with .finally() that
// achieves this.

function mockAsyncOp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Operation succeeded");
      } else {
        reject("Operation failed");
      }
    }, 1000);
  });
}

// mockAsyncOp()
//   .then((successMessage) => console.log(successMessage))
//   .catch((failMessage) => console.log(failMessage))
//   .finally(() => console.log('Operation attempted'));

// note this: .then and .catch are given a function and automatically send a value
// to that function (value or reason)
mockAsyncOp()
  .then(console.log)
  .catch(console.error)
  .finally(() => console.log('Operation attempted'));


// 5. Implement a loadData function that fetches data but sometimes fails. It
// should return a promise that either resolves with "Data loaded" or rejects
// with "Network error". Use a .catch() block to return a recovery promise that
// resolves with "Using cached data" in case of failure.

function loadData() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Data loaded');
    } else {
      reject('Network error');
    }
  })
    .catch(() => {
      console.error('An error occurred...');
      return Promise.resolve('Using cached data');
    });
}

loadData()
  .then(console.log)
