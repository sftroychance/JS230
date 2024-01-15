// Implement a function that makes an element bold and allows the user of the
// function to optionally do something else with it.

// <!doctype html>
// <html lang="en-US">
//   <head>
//     <meta charset="utf-8">
//     <title>Bold Element + Custom</title>
//   </head>
//   <body>
//     <section>Hello World</section>
//     <p>Greetings!</p>
//   </body>
// </html>

// note: before executing the callback in 'makeBold', we should
// verify callback is not null and that it is a function

function makeBold(element, callback) {
  element.style.fontWeight = 'bold';
  // callback(element);

  if (callback && typeof callback === 'function') {
    callback(element);
  }
}


let sectionElement = document.querySelector('section');

makeBold(sectionElement, function(elem) {
    elem.classList.add('highlight');
});

console.log(sectionElement.classList.contains('highlight')); // true
console.log(sectionElement.style.fontWeight); // bold


// further exploration
// You can get the same behavior as the above solution by creating your own
// custom event. For this further exploration exercise, create your own
// CustomEvent called bolded that allows the user to add it as the type of event
// to listen to.

// we are using the event listener to define the callback we want to execute
// must comment out code above to run this

// define custom event
const boldedEvent = new CustomEvent('bolded');

function makeBold(element) {
  element.style.fontWeight = 'bold';
  element.dispatchEvent(boldedEvent);
}

let sectionElement = document.querySelector('section');

sectionElement.addEventListener('bolded', (event) => {
  event.target.elem.add('highlight');
});

// also can do this
// note that here the callback is not an arrow function, or 'this' would not work

// sectionElement.addEventListener('bolded', function() {
//   this.classList.add('highlight');
// });

makeBold(sectionElement);

console.log(sectionElement.classList.contains('highlight')); // true
console.log(sectionElement.style.fontWeight); // bold
