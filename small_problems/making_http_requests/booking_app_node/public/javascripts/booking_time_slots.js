document.addEventListener('DOMContentLoaded', () => {
  const basePageState = document.body.innerHTML;

  loadScheduleLookup();

  document.querySelector('#submitBookingBtn')
    .addEventListener('click', submitBooking);

  async function loadScheduleLookup() {
    let scheduleData;
    let staffNames;

    try {
      [scheduleData, staffNames] =
        await Promise.all([getSchedules(), getStaffData()]);
    } catch(error) {
        console.error('Error retrieving lookup data: ', error);
    }

    const selectElement = document.querySelector('#schedule');

    for (const {id, date, time, student_email, staff_id} of scheduleData) {
      if (!student_email) {
        const optionText = `${staffNames[staff_id]} | ${date} | ${time}`;
        const optionValue = id;

        const newOption = new Option(optionText, optionValue);
        selectElement.add(newOption);
      }
    }
  }

  function addStudentSubform(bookingSequence, studentEmail) {
    const divElement = document.createElement('div');
    divElement.id = 'new_student';

    const formElement = document.createElement('form');
    formElement.id = 'subform';

    const headerElement = document.createElement('h1');
    headerElement.textContent = 'Please provide new student details';

    const emailLabel = document.createElement('label');
    emailLabel.htmlFor = 'subform_email';
    emailLabel.textContent = 'Email:';

    const emailElement = document.createElement('input');
    emailElement.type = 'text';
    emailElement.id = 'subform_email';
    emailElement.name = 'email';
    emailElement.value = studentEmail;

    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'subform_name';
    nameLabel.textContent = 'Name:';

    const nameElement = document.createElement('input');
    nameElement.type = 'text';
    nameElement.id = 'subform_name';
    nameElement.name = 'name';

    const bookingSequenceLabel = document.createElement('label');
    bookingSequenceLabel.htmlFor = 'subform_bs';
    bookingSequenceLabel.textContent = 'Booking sequence:';

    const bookingSequenceElement = document.createElement('input');
    bookingSequenceElement.type = 'text';
    bookingSequenceElement.id = 'subform_bs';
    bookingSequenceElement.name = 'booking_sequence';
    bookingSequenceElement.value = bookingSequence;
    bookingSequenceElement.disabled = true;

    const submitButton = document.createElement('button');
    submitButton.id = 'submitStudentBtn';
    submitButton.type = 'button';
    submitButton.textContent = 'Submit';

    const formList = document.createElement('ul');

    const formElements = [
      [emailLabel, emailElement],
      [nameLabel, nameElement],
      [bookingSequenceLabel, bookingSequenceElement]
    ];

    for (const [label, element] of formElements) {
      const line = document.createElement('li');
      line.appendChild(label);
      line.appendChild(element);
      formList.appendChild(line);
    }

    const buttonLine = document.createElement('li');
    buttonLine.appendChild(submitButton);
    formList.appendChild(buttonLine);

    formElement.appendChild(formList);
    divElement.appendChild(headerElement);
    divElement.appendChild(formElement);
    document.body.appendChild(divElement);
    nameElement.focus();

    submitButton.addEventListener('click', submitStudent);
  }

  async function submitBooking() {
    const url = '/api/bookings';
    const form = document.querySelector('#main');

    if (form.email.value === '') {
      alert('Email is empty');
      return;
    }

    const data = {
      id: parseInt(form.schedule.value, 10),
      student_email: form.email.value,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }

    let response;

    try {
      response = await fetch(url, options);
    } catch(error) {
      console.error('Error adding booking:', error);
    }

    const responseText = await response.text();

    if (response.status === 204) {
      alert('Booked');
      resetPage();
    } else {
      if (responseText.match(/booking_sequence/)) {
        const booking_sequence = responseText.split(': ').at(-1);
        addStudentSubform(booking_sequence, form.email.value);
      } else {
        alert(responseText);
      }
    }
  }

  async function submitStudent() {
    const form = document.querySelector('#subform');
    const url = '/api/students';

    const data = {
      email: form.email.value,
      name: form.name.value,
      booking_sequence: parseInt(form.booking_sequence.value, 10),
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    let response;

    try {
      response = await fetch(url, options);
    } catch(error) {
      console.error('Error adding student', error);
    }

    const responseText = await response.text();

    if (response.status === 201) {
      alert(responseText);
      submitBooking();
    } else {
      alert(responseText);
    }
  }

  async function getStaffData() {
    const url = '/api/staff_members';
    const result = {};

    const response = await fetch(url);
    const data = await response.json();

    for (const {id, name} of data) {
      result[id] = name;
    }

    return result;
  }

  async function getSchedules() {
    const url = `/api/schedules`;

    const response = await fetch(url);
    return response.json();
  }

  function resetPage() {
    document.body.innerHTML = basePageState;
    loadScheduleLookup();
  }
});
