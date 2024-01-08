// 1. move header to top
// 2. move h1 to first child of header
// 3. switch img tags

// fix internal stuff and then append?

// move body header
let bodyHeader = document.querySelector('body > header');
document.body.insertAdjacentElement('afterbegin', bodyHeader);

// move h1 to body header
let h1 = document.querySelector('main > h1');
bodyHeader.insertAdjacentElement('afterbegin', h1);

// move figures to within article element
let firstFigure = document.querySelector('#content figure:first-of-type');
let secondFigure = document.querySelector('#content figure:last-of-type');

let article = document.querySelector('article');
article.appendChild(firstFigure);
article.appendChild(secondFigure);

// switch images between figures
let babyImage = document.querySelector('img[alt="The baby mop"]');
let chinImage = document.querySelector('img[alt="The chin stick"]');

firstFigure.insertAdjacentElement('afterbegin', chinImage);
secondFigure.insertAdjacentElement('afterbegin', babyImage);
