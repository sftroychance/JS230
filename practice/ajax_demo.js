const DOMAIN = 'https://ls-230-xhr-demo.herokuapp.com';

let output;

function createFieldset() {
  let fieldset = document.createElement('fieldset');
  let legend = document.createElement('legend');
  legend.textContent = 'after load event fires';
  fieldset.appendChild(legend);
  output.appendChild(fieldset);
  output = fieldset;
}

function makeRequest(url) {
  output.innerHTML = '';

  log('var request = new XMLHttpRequest();');

  let request = new XMLHttpRequest();

  request.addEventListener('load', event => {
    console.log(event);
    let request = event.target;
    console.log(request);
    createFieldset();
    log('request.status', request.status);
    log('request.statusText', request.statusText);
    log('request.responseText', request.responseText);
    log('request.readyState', request.readyState);
    log(`request.getResponseHeader('Content-Type')`, request.getResponseHeader('Content-Type'));
    log('total download ', event.total);
    log('event type', event.type);
  });

  request.addEventListener('progress', (e) => {
    console.log('event type', e.type);
    console.log('in progress ', e.loaded, ' of ', e.total, ' bytes');
  });

  request.open("GET", DOMAIN + url);
  request.send();

  log('request.send();');
}

function log(label, message) {
  let p = document.createElement('p');
  let code = document.createElement('code');
  code.textContent = label;
  p.appendChild(code);

  let span = document.createElement('span');
  if (message) {
    span.innerHTML = ` &raquo; ${message}`;
  }

  p.appendChild(span);
  output.appendChild(p);
}

document.addEventListener('DOMContentLoaded', () => {
  output = document.getElementById('output');

  document.getElementById('makeRequest').addEventListener('click', () => {
    makeRequest('/status/200');
  });
});
