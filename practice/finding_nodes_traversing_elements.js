// use HTML at this link: https://d3905n0khyu9wc.cloudfront.net/the_dom/polar_bear_wiki.html

// code snippets run in devtools

// 1. Write some JavaScript code to retrieve a word count for each h2 heading on the page.

let h2Array = Array.from(document.querySelectorAll('H2'));

let wordCounts = h2Array.map(node => node.innerText.split(' ').length);

// 2. The page has a table of contents with the title "Contents" and links to the different content sections on "Naming and etymology," "Taxonomy and evolution," etc.

// Use three different DOM methods to retrieve a reference to the div element that contains the table of contents.

document.getElementById('toc');

document.body.querySelector(".toc");

document.body.querySelector("#toc");

// 3. Write some JavaScript code to change the color for every odd indexed link in the table of contents to green.

let contentsLinks = document.querySelectorAll('.toc a');

let oddLinks = Array.from(contentsLinks).forEach((link, idx) => {
  if (idx % 2 === 1) {
    link.style.color = 'green';
  }
});

// 4. Write some JavaScript code to retrieve the text of every thumbnail caption on the page.

let thumbCaptions = document.querySelectorAll('.thumbcaption');

let thumbCaptionText = Array.from(thumbCaptions).map(node => node.textContent.trim());
// let thumbCaptionText = Array.from(thumbCaptions).map(node => node.innerText);

// 5. You can think of the scientific classification of an animal as a series of key-value pairs. Here, the keys are taxonomic ranks (Domain, Kingdom, Phylum, etc.). The values are the specific groups to which the animal belongs.

// Write JavaScript code that extracts the classification of animals from the web page and logs an Object that uses the ranks as keys and the groups as values. You may assume the taxonomic ranks to use as keys is provided for you as an array.

// A: get table element that contains data
//  - get all td elements where inner text matches the ranks (from array)
//  - iterate over those td elements to get group for each
//    - get next sibling td
//    - get child a
//    - get textContent of a

let infoTable = document.querySelector('table.infobox');
const RANKS = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];

let tdElements = infoTable.getElementsByTagName('TD');
rankElements = [...tdElements].filter(element => RANKS.includes(element.innerText.slice(0, -1)));

const rankObject = {};

[...rankElements].forEach(element => {
  let group = element.nextElementSibling.firstElementChild.innerText;
  rankObject[element.innerText.slice(0, -1)] = group;
});

console.log(rankObject);

// or, after reviewing solution
// -> can get all td elements directly with querySelectorAll
// -> instead of filtering, test rank value and then assign object property if
// there is a match

const RANKS = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'];

let tdElements = document.querySelectorAll('table.infobox td');

let result = {};

[...tdElements].forEach(element => {
  let rank = element.innerText.slice(0, -1);

  if (RANKS.includes(rank)) {
    let group = element.nextElementSibling.firstElementChild.innerText;
    result[rank] = group;
  }
});

console.table(result);


