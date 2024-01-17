// we are revising the previous code (loading_html_via_XHR.js) to handle
// form submission so that when we hit the 'save' button on the product
// edit form, it will submit the form data to the server

// we will add the code to an event listener for the store; the event is
// 'submit'. For the HTMLFormElement, the submit event fires when a `submit`
// button is clicked. The event.target will be the form.

// - serialize the data (we will use FormData)
// - instantiate an XHR object and initialize it to a POST method with the
// full URL (the singular /products/:id resource)
// - send the request

// NOTE: the form.action value will have the local server info prepended:
// `http://127.0.0.1:5500/products/19`
// To get around this, we need to access the attribute, which reflects how
// the action is defined in the original HTML for the page; this will be in
// the form.attributes property, and we access it with `form.getAttribute()`

// With this, we still get an error when we try to submit the form data--we are
// not authorized! I did not see this message, which indicated an error:
// I did not add an event listener for loading the response from the server
// with the POST action

// Set up authorization per instructions; still get an error, but we can ignore it for now
// - it is expected that we might at this point
// when we reload the page, we see that our updates took effect

document.addEventListener('DOMContentLoaded', () => {
  let store = document.getElementById('store');

  let request = new XMLHttpRequest();
  request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');

  request.addEventListener(
    'loadend',
    (event) => store.innerHTML = request.response
  );

  request.send();

  store.addEventListener('click', (event) => {
    if (event.target.tagName !== 'A') {
      return;
    }

    event.preventDefault();

    const linkRequest = new XMLHttpRequest();
    linkRequest.open(
      'GET',
      "https://ls-230-web-store-demo.herokuapp.com" + event.target.getAttribute("href")
    );

    linkRequest.addEventListener('load', (e) => {
      store.innerHTML = e.target.response;
    });

    linkRequest.send();
  });

  store.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.target;

    const data = new FormData(form);

    const submitRequest = new XMLHttpRequest();
    const url = 'https://ls-230-web-store-demo.herokuapp.com' + form.getAttribute('action');
    submitRequest.open(form.method, url);
    submitRequest.setRequestHeader('Authorization', 'token AUTH_TOKEN');

    submitRequest.addEventListener('load', function(event) {
      store.innerHTML = this.response;
    });

    submitRequest.send(data);
  })
});
