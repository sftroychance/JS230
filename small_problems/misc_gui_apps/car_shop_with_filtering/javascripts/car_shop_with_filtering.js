$(document).ready(function() {
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
  const selectElements = [$('#make'), $('#model'), $('#price'), $('#year')];
  const templates = {};

  function prepareTemplates() {
    const $templateScripts = $('[type="text/x-handlebars"]');
    const $partialScripts = $templateScripts.filter('.partial');

    for (const template of $templateScripts) {
      templates[template.id] = Handlebars.compile($(template).html());
    }

    for (const partial of $partialScripts) {
      Handlebars.registerPartial(partial.id, templates[partial.id]);
    }
  }

  function uniqueValuesPerProperty(objArray) {
    const result = {};

    for (const obj of objArray) {
      for (const prop in obj) {
        result[prop] = result[prop] ?? [];
        result[prop].push(obj[prop]);
      }
    }

    for (const prop in result) {
      result[prop] = ['All', ...new Set(result[prop])];
    }

    return result;
  }

  function loadOptions() {
    const optionsData = uniqueValuesPerProperty(cars);

    for (const prop in optionsData) {
      $(`#${prop}`).html(templates.options({options: optionsData[prop]}));
    }
  }

  function updateAllOptions() {
    const updateElements = selectElements.filter(element => {
      return element.attr('id') !== this.id
    });

    const enteredCriteria = gatherCriteria();

    for (const element of updateElements) {
      const currentElement = element.attr('id');

      const currentCriteria = {...enteredCriteria};
      delete currentCriteria[currentElement];

      const filteredCars = filterByCriteria(currentCriteria);

      const { [currentElement]: options } =
        uniqueValuesPerProperty(filteredCars);

      const currentValue = $(`#${currentElement}`).val();
      $(`#${currentElement}`).html(templates.options({options}));
      $(`#${currentElement}`).val(currentValue);
    }
  }

  function loadCars(selectedCars) {
    $('main').html(templates.cars({cars: selectedCars}));
  }

  function gatherCriteria() {
    const criteria = {};
    for (const $select of selectElements) {
      if ($select.val() !== 'All') {
        criteria[$select.attr('id')] =
          ['price', 'year'].includes($select.attr('id'))
          ? +$select.val()
          : $select.val();
      }
    }

    return criteria;
  }

  function filterByCriteria(criteria) {
    let filteredCars = cars;

    if (Object.keys(criteria)) {
      for (const prop in criteria) {
        filteredCars = filteredCars.filter(car => {
          return car[prop] === criteria[prop];
        })
      }
    }

    return filteredCars;
  }

  function filterCars() {
    const filterCriteria = gatherCriteria();
    const filteredCars = filterByCriteria(filterCriteria);

    loadCars(filteredCars);
  }

  function bindEvents() {
    $('#btn-filter').on('click', filterCars);

    $('#nav').on('change', 'select', function(e) {
      updateAllOptions.call(this);
    });
  }

  prepareTemplates();
  loadOptions();
  loadCars(cars);
  bindEvents();
});
