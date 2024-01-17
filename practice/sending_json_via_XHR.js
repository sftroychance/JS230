// Write some JavaScript to create a new product by sending a request to the JSON API on our web store. To create a product, make a POST request to https://ls-230-web-store-demo.herokuapp.com/v1/products. To make the post request, you'll need the following:

// Content-Type header set to application/json; charset=utf-8
// Authorization header set to token AUTH_TOKEN
// json object with the following properties:
// name
// sku (must have 3 or more characters)
// price (must be an integer greater than 0)

const url = 'https://ls-230-web-store-demo.herokuapp.com/v1/products';

const request = new XMLHttpRequest();
request.open('POST', url);
request.setRequestHeader('Authorization', 'token AUTH_TOKEN');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

const updateObject = {
  name: "Waste Not-Want Not Kit",
  sku: 'wnwn877',
  price: 4799
};

const jsonData = JSON.stringify(updateObject);

request.addEventListener('load', (event) => {
  console.log('This product was added:', event.target.responseText);
});

request.addEventListener('error', () => {
  console.log('Record could not be updated.');
});

request.send(jsonData);
