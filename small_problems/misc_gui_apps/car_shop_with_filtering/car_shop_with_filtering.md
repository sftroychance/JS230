# Project Notes

## Project Name
Car Shop with Filtering

## Description
Create an application that shows a grid of cars from a collection of cars. Users can filter the cars by make, model, price and year of manufacture.

Specifications

Display the following information for each car:

an image
make and model
price
year manufactured

The page should have a filtering area that contains the following:

A select box for car makes. Populate the options by selecting all the unique makes from our car collection
A select box for car models. Populate the options by selecting all the unique car models from our car collection
A select box for years. Populate the options by selecting all the unique years from our car collection
A select box for price. Populate the options by selecting all the unique prices from our car collection
A filter button
When the user clicks the filter button, filter the cars so that the cars displayed all have the same price, model, make and manufacture year as the selected values.

const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 21000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 2500 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 16000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
];

## HTML
Header (div)
- h1 Buy Used Cars
- nav ul flexbox row
  - label/select make
  - label/select model
  - label/select price
  - label/select year
  - button to filter
Main (div) flexbox row wrap
  - div flexbox column (align end - photo bottoms should line up)
    - img
    - h2 or h3 make + model
    - p year
    - p price
    - button buy

- templates
- select field options, since we are pulling those from our data (but keep select elements in html); use partial for single option entry (might not be necessary, though) and template to process an array
- main divs - create partial for single car entry and template to process an array of them

* select options are not sorted

## CSS
flex for divs
nav: white text, orange background
select: white border, gradient background

## JS
page load:
- compile templates
- render templates using data array
  - populate select elements with options (reduce data array to object of four arrays)
  - populate main divs
- bind events

event listeners:
- filter button: not practical to place data attributes on every div for all four possiblities--easier to filter data array and re-render main div; no IDs involved

- advanced version: selecting make will filter the models select options; probably easiest to query data array and re-render select options

- no listener on buy button

solution notes:
pretty straightforward
- collected all options in an options object and used that to populate select elements; it helped to coordinate select element IDs with car object property names\

To keep in mind per LS solution:
This is a very small data set; in production, it will probably contain thousands of cars. In that case, rather than downloading the entire data set to the client, it is best to do all filtering on the server side; the resultant data sets will be small because of pagination (or loading incrementally for 'infinite' scrolling)--if a match has hundreds of cars, we would load them (probably per a sort order) maybe 25 at a time for rendering to the page, and then as the page scrolls, we would make repeated requests to get the next 25 (to prevent downloading data unnecessarily if the user does not scroll completely through it)


# next problem
I already implemented the functionality to update the model each time make is updated.

For further exploration, now update the select options every time you make a change to one of them

flow:

Every time you select an option:
- select an option in one of the select elements
- iterate over all the other select elements (filter the selectElements to eliminate 'this')
  - save current value
  - update the current option list based on the selected criteria in the OTHER fields
    function to gather all currently set criteria into an object
    filter that object to get rid of property of current select element
    function to take criteria object and return filtered list of cars
    collect options for that list of cars for the current select element
    re-render option list of current element
  - set to saved value

- change event listener to nav ul and delegate to 'select'
