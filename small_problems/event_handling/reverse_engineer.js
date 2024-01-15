// Without changing the behavior of the following code, remove the call to
// event.stopPropagation and refactor the result.

// what is the behavior?
// when someone clicks anywhere in the document outside the container,
// the container element will be hidden, except when they click within
// the container itself.

// we can remove the second event handler altogether if we
// check the event target in the first event handler and change
// the style only if the #container element was not clicked

// the error in my approach:
// - the #container element, as per its name, likely contains other
// elements, and in this case, if you were to click on one of its internal
// elements, the target would not be the #container element, so we need
// to determine if the element is contained within the container or is the container itself

// `Node.contains()` - a node contains itself

document.querySelector('html').addEventListener('click', (event) => {
  // if (event.target !== document.querySelector('#container')) {
  //   document.querySelector('#container').style = 'display: none';
  // }
  const containerElement = document.querySelector('#container');

  if (!containerElement.contains(event.target)) {
    containerElement.style = 'display: none'
  }
});

// document.querySelector('#container').addEventListener('click', event => {
//   // event.stopPropagation();
// });
