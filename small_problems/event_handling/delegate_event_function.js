// Possible elements for use with the scenarios
const element1 = document.querySelector('table');
const element2 = document.querySelector('main h1');
const element3 = document.querySelector('main');

// Possible callback for use with the scenarios
const callback = ({target, currentTarget}) => {
  alert(`Target: ${target.tagName}\nCurrent Target: ${currentTarget.tagName}`);
};

function delegateEvent(parentElement, selector, eventType, callback) {
  if (parentElement && parentElement instanceof Element) {
    // addEventListener always returns undefined, so we can return true by
    // prepending !
    return !parentElement.addEventListener(eventType, (event) => {
      // Array.from to convert from NodeList
      // run querySelectorAll on the parentElement, and that ensures the parentElement
      // itself is not the target (we only want children of parentElement to respond
      // to the callback)
      if (Array.from(parentElement.querySelectorAll(selector)).includes(event.target)) {
        callback(event);
      }
    });
  }
}

// console.log(delegateEvent(element1, 'p', 'click', callback));
// console.log(delegateEvent(element2, 'p', 'click', callback));
// console.log(delegateEvent(element2, 'h1', 'click', callback));
// console.log(delegateEvent(element3, 'h1', 'click', callback));
// console.log(delegateEvent(element3, 'aside p', 'click', callback));
console.log(delegateEvent(element2, 'p', 'click', callback));

const newP = document.createElement('P');
const newContent = document.createTextNode('New Paragraph');
newP.appendChild(newContent);

element2.appendChild(newP);
