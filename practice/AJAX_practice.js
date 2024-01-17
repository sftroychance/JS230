const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const myRequest = new XMLHttpRequest();

myRequest.addEventListener('readystatechange', () => {
  console.log('ready state: ', myRequest.readyState);
});

myRequest.open('GET', 'www.google.com');

myRequest.setRequestHeader('Content-type', 'text/html; charset: utf-8');

myRequest.addEventListener('load', (e) => {
  const resultObj = {};
  const result = e.target;
  resultObj.body = result.responseText;
  resultObj.status = result.status;
  resultObj.headers = result.getAllResponseHeaders();
  console.log(resultObj);
});

myRequest.send();
