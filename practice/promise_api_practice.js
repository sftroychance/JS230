// 1. Use Promise.all() to execute two instances of the flakyService function
// and the loadData function concurrently. Log the results if all the operations
// are successful. Handle the situation where one or more of the promises might
// fail by logging "One or more operations failed".

function flakyService() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Operation successful");
    } else {
      reject("Operation failed");
    }
  });
}

function loadData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Data loaded");
      } else {
        reject("Network error");
      }
    }, 1000);
  });
}

let services = [flakyService(), flakyService(), loadData()];

Promise.all(services)
  .then((results) => console.log(results))
  .catch(() => console.log('One or more operations failed.'));

// 2. Imagine you have two promises, firstResource and secondResource, that
// resolve after different intervals. Use Promise.race() to log the value of
// whichever promise resolves first.

const firstResource = new Promise((resolve) =>
  setTimeout(() => resolve("First resource loaded"), 500)
);
const secondResource = new Promise((resolve) =>
  setTimeout(() => resolve("Second resource loaded"), 1000)
);

Promise.race([firstResource, secondResource])
  .then((result) => console.log(result))
  .catch((error) => console.error(error));

// per LS solution (neither promise will return an error)
// Promise.race([firstResource, secondResource])
//   .then(console.log);

// 3. You have multiple instances of flakyService promises. Implement a strategy
// using Promise.allSettled() to execute all services but log all the different
// outcomes, whether fulfilled or rejected.

services = [flakyService(), flakyService(), flakyService()];

Promise.allSettled(services)
  .then(console.log);

// LS solution: more descriptive statements for each result
Promise.allSettled(services).then((results) => {
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(
        `Service ${index + 1} succeeded with message: ${result.value}`
      );
    } else {
      console.error(
        `Service ${index + 1} failed with error: ${result.reason}`
      );
    }
  });
});

// 4. Let's say you want to load cached data with loadData as a backup when
// flakyService fails. Demonstrate how you could use Promise.any() to attempt
// fetching from flakyService first and, if that fails, to rely on loadData
// without failing the overall operation.

function loadData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      // loadData always resolves this time
      resolve("Data loaded");
    }, 1000);
  });
}

const primaryOperation = flakyService();
const fallbackOperation = loadData();

Promise.any([primaryOperation, fallbackOperation])
  .then(console.log);

// 5. Implement a helper function loadMultipleResources that takes an array of
// URLs and fetches them using the fetch API. Use Promise.allSettled() to return
// an array of fetched responses, regardless of whether some URLs may lead to
// failure.

// In my first solution attempt, instead of using `map` I tried to create an
// array to hold the results, but in the handlers for fetch I tried to push the
// outcome to that array. This did not work because when the fetch
// promises resolve, that array would be out of scope.

function loadMultipleResources(urls) {
  // note subtletly here: in the LS solution there are no brackets for the map
  // callback arrow function--this is fine, because `fetch` is a single statement
  // though the handlers make it look longer
  // BUT if you use brackets, you have to explicitly return
  const urlPromises = urls.map((url) => {
    return fetch(url)
      .then((response) => response.json())
      .catch(() => "Failed to fetch")
  });

  // alternative without using map--make sure to push the promise to the array,
  // not the result of the promise (`urlPromises` will be out of scope when the
  // promise resolves)

  // const urlPromises = [];

  // for (const url of urls) {
  //   urlPromises.push(
  //     fetch(url)
  //       .then((response) => response.json())
  //       .catch(() => "Failed to load")
  //   )
  // }

  return Promise.allSettled(urlPromises);
}

loadMultipleResources([
  "https://jsonplaceholder.typicode.com/todos/1",
  "invalidUrl",
]).then((results) => {
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      console.log("Fetched data:", result.value);
    } else {
      console.error(result.reason);
    }
  });
});

// Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// Fetched data: Failed to fetch
