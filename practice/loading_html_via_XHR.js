// Code description:
// Overview: This code will load after the DOM has been loaded. This code makes an
// AJAX request and adds the HTML result to a div tag with id store.
// inputs: target URL, element id
// outputs: new HTML rendered to the page
// We place all our code into a listener that loads the code when the DOM content
// has loaded, so a to not run the code until the DOM is in place.
// We initialize variable store to point to the element with id store
// We instantiate an XHR object, and then call the open method, passing the
// HTTP method and url as arguments); this initializes the XHR object
// We define an event listener that will be called after the loadend event has been
// fired on the request; this event fires when the response to the request has been
// loaded. The callback updates our element's innerHTML property to contain the response
// to our request.
// We then call the 'send()' method on our XHR object, which sends the HTTP request
// to the server for the given URL.
// When the complete response to our HTTP request has loaded, the 'loadend' event will fire;
// the response to our HTTP request will be assigned to the div's innerHTML property; if there is
// html returned in the response (which we expect), the HTML page will be updated to include
// the new information.

// document.addEventListener('DOMContentLoaded', () => {
//   let store = document.getElementById('store');

//   let request = new XMLHttpRequest();
//   request.open('GET', 'https://ls-230-web-store-demo.herokuapp.com/products');

//   request.addEventListener(
//     'loadend',
//     (event) => store.innerHTML = request.response
//   );

//   request.send();
// });

// The above code indeed updates the HTML rendered on the page, and we are presented
// with a list of web store products, each as a link to another page.

// An issue with the above code is that the links do not redirect us to the
// appropriate corresponding page. We need to update the page so that the links work as
// expected

// to do this, we will add an event listener to the div (the common parent element for
// all the links) to respond to the 'click' event. In the callback for this listener,
// we verify that the clicked element is an anchor tag; if so, we will immediately
// prevent the default behavior (which is going to a new page) because we are going to
// load the data onto the current page using AJAX. We will then use XHR to request the
// HTML content for the target page. We will add an event listener to our request object
// to fire when the complete response has been received, and then we will update the current
// page to update the HTML with the new content within the target div.

// revised code:

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
});

// With this code, clicking a product link in the web store products list will
// update the page to show detailed information for that product, along with a
// link to edit the product info and a link to return to the product listing.

// The link to edit works, loading an edit page. This uses the same event listener
// defined for clicking a link in the store div (which, in this case, returns the
// edit form HTML with a button to save the data). clicking this button returns a 405 error.

// 1. What prevents the form submission from working? Investigate the problem with the web developer tools in your browser.

// The form button action is to submit a POST request to the specific product page (which
// is the appropriate resource to use); however, the url provided for this request is
// a relative url, not the full url for the server; it attempts to make a POST request to
// our local server (verified by viewing the 'network' tab in DevTools when clicking the button)


