document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('#staff_select');

  loadStaffList();

  selectElement.addEventListener('change', () => {
    if (selectElement.value === '<--Select one-->') {
      return;
    }

    document.querySelector('#schedule')?.remove();

    loadStaffSchedule(selectElement.value);
  });

  async function loadStaffSchedule(staffID) {
    const url = `/api/schedules/${staffID}`;

    let response;
    try {
      response = await fetch(url);
    } catch(error) {
      console.error('Failed to fetch schedules: ', error);
    }

    const scheduleData = await response.json();

    const scheduleDiv = document.createElement('div');
    scheduleDiv.id = 'schedule';

    const heading = document.createElement('h1');
    scheduleDiv.appendChild(heading);

    const highlightInfo = document.createElement('p');
    highlightInfo.textContent = 'Highlighted schedules are booked.';

    if (scheduleData.length === 0) {
      heading.textContent = 'There are no schedules for this staff member';
      document.body.appendChild(scheduleDiv);
      return;
    } else {
      heading.textContent = 'Available schedules:';
      scheduleDiv.appendChild(highlightInfo);
    }

    const scheduleList = document.createElement('ul');

    for (const schedule of scheduleData) {
      const line = document.createElement('li');
      line.setAttribute('scheduleID', schedule.id);

      const lineText = document.createElement('p');
      lineText.textContent = `Date: ${schedule.date} | Time: ${schedule.time}`;
      line.appendChild(lineText);

      const lineButton = document.createElement('button');
      lineButton.type = 'button';

      if (schedule.student_email) {
        line.classList.add('booked');
        lineButton.setAttribute('buttonTarget', 'booking');
        lineButton.textContent = `Cancel booking: ${schedule.student_email}`;
      } else {
        lineButton.setAttribute('buttonTarget', 'schedule');
        lineButton.textContent = 'Cancel schedule';
      }

      line.appendChild(lineButton);

      scheduleList.appendChild(line);
    }

    scheduleDiv.appendChild(scheduleList);
    document.body.appendChild(scheduleDiv);

    scheduleList.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON') {
        const listItem = target.parentElement;
        const scheduleID = listItem.getAttribute('scheduleID');

        if (target.getAttribute('buttonTarget') === 'booking') {
          target.setAttribute('buttonTarget', 'schedule');
          target.textContent = 'Cancel schedule';

          listItem.classList.remove('booked');

          cancelBooking(scheduleID);
        } else {
          listItem.remove();
          cancelSchedule(scheduleID);
        }
      }
    });

  }

  async function loadStaffList() {
    const url = '/api/staff_members';

    let response;
    try {
      response = await fetch(url);
    } catch(error) {
      console.error('Failed to load staff list: ', error);
    }

    const staffData = await response.json();

    staffData.sort((a, b) => a.name < b.name ? -1 : 1);

    selectElement.add(new Option('<--Select one-->'));

    for (const {id, name} of staffData) {
      const newOption = new Option(name, id);
      selectElement.add(newOption);
      }
    }

  async function cancelSchedule(scheduleId) {
    const url = `/api/schedules/${scheduleId}`;
    const options = {
      method: 'DELETE',
    };

    let response;
    try {
      response = await fetch(url, options);
    } catch(error) {
      console.error('Error submitting request:', error);
    }

    if (response.status === 204) {
      alert('Schedule deleted');
    } else {
      const responseText = await response.text();
      alert(responseText);
    }
  }

  async function cancelBooking(bookingId) {
  const url = `/api/bookings/${bookingId}`;
    const options = {
      method: 'PUT',
    };

    let response;
    try {
      response = await fetch(url, options);
    } catch(error) {
      console.error('Error submitting request:', error);
    }

    if (response.status === 204) {
      alert('Booking deleted');
    } else {
      const responseText = await response.text();
      alert(responseText);
    }

  }
});



// further exploration: The solution is straightforward. However, there is no user interface to facilitate this. Using the existing API endpoints, implement the interface for cancellations.

// for staff schedules: to cancel a schedule, you have to cancel any booking first

// the booking id is the same as the schedule id

// for both: create new page to view schedules and bookings (they are the same thing)
// - select element with staff names, value is staff id
//  - first option is 'please choose a staff member'
// - on select, show list of all schedules / sort by date and time (might already be sorted)
//  - for each schedule, include a button to delete it (button name includes schedule id)
//  - different color if booked
//  - if booked, include button to cancel booking (button name includes booking id) (update list item to change color and remove cancel booking button)

// or
// have just one button, if there is a booking it is a cancel booking button, otherwise a cancel schedule button; when the booking is canceled, the button changes

// add class 'booked' to schedule item li element (this takes care of the styling also)
// if cancel booking button hit, fetch to cancel it, remove booked class from li, change button text

// use setAttribute on the button element to link it to the schedule id

// a late refactor:
// for a booking, it would be more helpful to include the email of the student who is booked in the schedule list item. I place this on the 'cancel booking' button as a quick solution (adding it to the text has the issue of removing it when the booking is canceled).
