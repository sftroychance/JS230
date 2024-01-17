// Write some JavaScript code that loads JSON data from
// https://api.github.com/repos/rails/rails, parses the JSON into a JavaScript
// object, and then logs the HTTP status code and the number of open issues to
// the console. The property to get the number of open issues is open_issues.

// Extend the code from the previous exercise to log the message 'The request could not be completed!' to the console when the request produces an error. You may replace the url in the previous exercise to "hts://api.github.com/repos/rails/rails" so that the error handler will be triggered.

// working url
// const url = 'https://api.github.com/repos/rails/rails';

// bad url to raise error:
const url = 'hts://api.github.com/repos/rails/rails';

const request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';

request.addEventListener('load', function (event) {
  const response = this.response;

  console.log(this.status);
  console.log(response.open_issues);
});

request.addEventListener('error', () => {
  console.log('The request could not be completed.');
});

request.send();
