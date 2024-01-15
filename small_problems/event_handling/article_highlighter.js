// When the user clicks on a navigation link (Articles 1-4), the browser scrolls to that article in the <main> element and adds the highlight class to it. If another element already has the highlight class, the browser removes the class from that element.

// get highlight class elements using getElementsByClassName; this is a LIVE collection
// get 'nav ul' element
// get main element

// define function to remove existing highlight classes

// place event listener on 'nav ul'
// - remove all highlight classes
// - add highlight class to element at event.target.href
// - don't preventDefault since that handles the linkage
// - stop propagation to prevent document click event

// When the user clicks on an article element or any of its child elements, the browser adds the highlight class to it. If another element already has the highlight class, the browser removes the class from that element.

// add click event listeners to articles (get all articles and do it in a loop)
// - remove highlight classes
// - add highlight class to article
// - stopPropagation to prevent document click event
// can't think of a way to add it to main, because target could be any element within
// the article--maybe check if target is article or target.parentElement is article?
// - stop propagation only if target is article or parentElement is article

// When the user clicks anywhere else on the page, the browser adds the highlight class to the main element. If another element already has the highlight class, the browser removes the class from that element.

// add click event to document
// - remove highlight classes
// - add highlight class to main

function removeHighlights() {
  for (const element of highlighted) {
    element.classList.remove('highlight');
  }
}

const highlighted = document.getElementsByClassName('highlight');
const navLinks = document.querySelector('header ul');
const main = document.querySelector('main');

navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    removeHighlights();
    e.stopPropagation();
    const linkID = '#' + e.target.href.split('#')[1];
    document.querySelector(linkID).classList.add('highlight');
  }
});

main.addEventListener('click', (e) => {
  removeHighlights();

  if (e.target.tagName === 'ARTICLE') {
    e.stopPropagation();
    e.target.classList.add('highlight');
  } else if (e.target.parentElement.tagName === 'ARTICLE') {
    e.stopPropagation();
    e.target.parentElement.classList.add('highlight');
  }
});

document.addEventListener('click', () => {
  removeHighlights();

  main.classList.add('highlight');
});



