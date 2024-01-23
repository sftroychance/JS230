// Implement the markup and JavaScript to add one or more schedules. You should handle and inform the user of the different possible responses of the server.

// Request body is a JSON object (array of objects)
// Response 201 -> text success message
// Response 400 -> text error message
// form data: staff_id (number), date (string), time (string)

// on form, staff name is a lookup field that has names of staff members but the field saves
// the selected staff id; so form generation starts with a JSON call to get the names and IDs of all staff members.

// dynamic HTML generation since we can submit multiple requests
// - button at top to add more schedules to same page
// - only one submit button to submit all schedules
// - 3 fields with labels--1 select element, 2 input text elements; use fieldset so we can label the form (legend property of fieldset - labeled 'schedule #' with # being the number)
// - no matter how many forms you add with the 'add schedule' button, they must all be filled in completely before submitting
// - creating option for select element: new Option(text, value, defaultSelected)
// - to add option to select element: selectElement.add(option);

// - format for submitting data:
// {
//   "schedules": [
//       {
//           "staff_id": 1,
//           "date": "10-10-10",
//           "time": "12:12"
//       }
//   ]
// }

// questions
// - how to process the form data when multiple forms can be included on a single page
//    - each subform is a form element? when we click submit, we iterate over all the forms on the page and build the data object from there?
//    - if multiple forms, each element needs a `form` attribute that indicates which form it belongs to
//    - how does FormData work when it is multiple forms?
//    - maybe we could do an array of FormData objects, and then map that to convert each to json?
//      JSON.stringify(formDataToJson(formData));
//  - you MUST stringify JSON objects to send in the request body (and also indicate `application/json` as the content-type)

// On load page:
// - JSON request for lookup field (method)
// - create and display one form (method to create form, taking as an argument the sequence number for that form, and also the data object for the lookup field) (form -> fieldset -> elements); add child to content div
// - create form method is an IIFE that is called after page load, so we can maintain the form sequence
// - sequence will be used to name the form and also the form elements id
// - single button at bottom not attached to any form and must be last child of content div (when adding new form, can just append child to parent, and it will move the button)

// On add schedule (event listener for click on that button, button not associated with a form)
// create form with next sequence number and display (add child to content div)

// on submit form:
// - gather data: iterate over document.forms, create FormData and convert each to JSON, append to array
// - iterate over array to build JSON object
// - stringify JSON object
// - XHR to post data and process response

document.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('#content');
  let staffLookup;

  resetPage();

  async function resetPage() {
    if (!staffLookup) {
      staffLookup = await getStaffLookup();
    }

    content.innerHTML = '';
    setupPage();
    createScheduleSubform(true);
    bindEvents();
  }

  const createScheduleSubform = function initializeSubforms() {
    let formNumber = 0;

    return function createSubform(resetFormNumber = false) {
      if (resetFormNumber) {
        formNumber = 0;
      }

      formNumber += 1;
      const form = document.createElement('form');
      form.name = `form_${formNumber}`;

      const selectLabel = document.createElement('label');
      selectLabel.htmlFor = `${form.name}_staff_id`;
      selectLabel.textContent = 'Staff Name :';

      const selectElement = document.createElement('select');
      selectElement.name = 'staff_id';
      selectElement.id = `${form.name}_staff_id`;

      for (const {name, id} of staffLookup) {
        selectElement.add(new Option(name, id));
      }

      const dateLabel = document.createElement('label');
      dateLabel.htmlFor = `${form.name}_date`;
      dateLabel.textContent = 'Date :';

      const dateElement = document.createElement('input');
      dateElement.type = 'text';
      dateElement.id = `${form.name}_date`;
      dateElement.name = 'date';
      dateElement.placeholder = 'mm-dd-yy';

      const timeLabel = document.createElement('label');
      timeLabel.htmlFor = `${form.name}_time`;
      timeLabel.textContent = 'Time :';

      const timeElement = document.createElement('input');
      timeElement.type = 'text';
      timeElement.id = `${form.name}_time`;
      timeElement.name = 'time';
      timeElement.placeholder = 'hh:mm';

      const formElements = [
        [selectLabel, selectElement],
        [dateLabel, dateElement],
        [timeLabel, timeElement],
      ];

      const fieldset = document.createElement('fieldset');
      const legend = document.createElement('legend');
      legend.textContent = `Schedule ${formNumber}`;
      fieldset.appendChild(legend);

      const fieldList = document.createElement('ul');
      for (const[label, element] of formElements) {
        const line = document.createElement('li');
        line.appendChild(label);
        line.appendChild(element);
        fieldList.appendChild(line);
      }

      const submitButton = document.querySelector('#submitButton');

      fieldset.appendChild(fieldList);
      form.appendChild(fieldset);
      content.appendChild(form);
      content.appendChild(submitButton);
    }
  }();

  function setupPage() {
    const addScheduleButton = document.createElement('button');
    addScheduleButton.id = 'addScheduleButton';
    addScheduleButton.type = 'button';
    addScheduleButton.textContent = 'Add schedule';

    const submitButton = document.createElement('button');
    submitButton.id = 'submitButton';
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';

    content.appendChild(addScheduleButton);
    content.appendChild(submitButton);
  }

  async function getStaffLookup() {
    const url = '/api/staff_members';

    data = await fetch(url);
    return data.json();
  }

  async function submitForm() {
    const url = 'api/schedules'
    const data = collectFormData();

    response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const message = await response.text();
    alert(message);

    if (response.status === 201) {
      resetPage();
    }
  }

  function collectFormData() {
    const data = {
      schedules: [],
    };

    for (const form of document.forms) {
      formDataObject = {
        staff_id: parseInt(form.staff_id.value, 10),
        date: form.date.value,
        time: form.time.value,
      }
      data.schedules.push(formDataObject);
    }

    return data;
  }

  function bindEvents() {
    document.querySelector('#addScheduleButton')
      .addEventListener('click', () => createScheduleSubform());

    document.querySelector('#submitButton')
      .addEventListener('click', submitForm);
  }
});
