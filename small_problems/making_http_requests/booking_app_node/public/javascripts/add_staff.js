// implementation notes
// - createForm() is not a necessary part of the assignment; I wanted practice manipulating the DOM. There's no real rationalization for this in this case (the form HTML is simple--simpler than doing the DOM manipulation).
// - for the form, I added the css to the existing `style.css` file, but might have been better to add it to a separate spreadsheet (might need to do this if further exercises for this problem set will create conflicting css). note: this has been refactored; add_staff.css contains the unique CSS for this question portion
// - I had a problem accessing the server's error response; explanation in solution response below.

// on viewing solution:
// - my error with accessing the server's error response was that I set `xhr.responseType` to `json`; if you look at the API documentation, the server returns json if the request is successful; if not, it returns a STRING--the responseText in this case was replaced with an exception. If we set `responseType` to 'json`, we need to make sure all possible responses from the server will be formatted as JSON.
// - the LS solution uses FormData but then converts it to JSON, and sets the `Content-type` header to `application/json`; this was not strictly necessary because submitting the data as FormDat worked fine (and doing so automaticaly sets `Content-type` for us). The API docs do not give an explicit format for sending data, but we would typically expect an API to let us know the format for submitting data; the API server has to be set up to receive data in specific formats. In our case here, it just happens that FormData and JSON both work.
// - For a `load` event listener, we don't need to use `event.target` to refer to the xhr object--just use the name of the xhr object itself. `event.target` is more appropriate if the listener callback must process events from multiple targets and needs to determine which at the time the callback runs.
// - my solution created a button in the form with type button (this type of button has no default action and is intended only to be coded by JS); so my form had no `action` or `method` attached to it. my event listener was assigned to the button's `click` event rather than the form's `submit` event. I considered this a way to avoid the `preventDefault()` on the event listener, but it appears that it is more appropriate to use the form's `submit` event in this case. This has been refactored in my code

function createForm() {
  const title = document.createElement('h1');
  title.textContent = 'Create new staff member';

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'api/staff_members';

  const emailLabel = document.createElement('label');
  emailLabel.textContent = 'Email:';
  emailLabel.htmlFor = 'email';

  const emailElement = document.createElement('input');
  emailElement.name = 'email';
  emailElement.type = 'email';
  emailElement.id = 'email';

  const nameLabel = document.createElement('label');
  nameLabel.textContent = 'Name:';
  nameLabel.htmlFor = 'name';

  const nameElement = document.createElement('input');
  nameElement.name = 'name';
  nameElement.type = 'text';
  nameElement.id = 'name';

  const buttonElement = document.createElement('input');
  buttonElement.type = "submit";
  buttonElement.textContent = 'Add staff';

  const emailLine = document.createElement('li');
  emailLine.appendChild(emailLabel);
  emailLine.appendChild(emailElement);

  const nameLine = document.createElement('li');
  nameLine.appendChild(nameLabel);
  nameLine.appendChild(nameElement);

  const buttonLine = document.createElement('li');
  buttonLine.appendChild(buttonElement);

  const formElements = document.createElement('ul');
  formElements.appendChild(emailLine);
  formElements.appendChild(nameLine);
  formElements.appendChild(buttonLine);

  form.appendChild(formElements);

  document.body.appendChild(title);
  document.body.appendChild(form);
}

function bindEvents() {
  const form = document.querySelector('form');

  form.addEventListener('submit', formSubmit);
}

function formSubmit(e) {
  e.preventDefault();
  const form = document.querySelector('form');

  const xhr = new XMLHttpRequest();
  xhr.open(form.method, form.action);

  const formData = new FormData(form);

  xhr.addEventListener('load', () => {
    if (xhr.status === 201) {
      const data = JSON.parse(xhr.response);
      alert(`Successfully created staff with id ${data.id}`);
      form.reset();
    } else if (xhr.status === 400) {
      alert(xhr.responseText);
    }
  });

  xhr.send(formData);
}

document.addEventListener('DOMContentLoaded', () => {
  createForm();
  bindEvents();
});
