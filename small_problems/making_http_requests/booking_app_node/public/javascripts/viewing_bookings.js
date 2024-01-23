document.addEventListener('DOMContentLoaded', async () => {
  const content = document.querySelector('#content');
  await loadBookingDates();

  document.querySelector('#outerlist')
    .addEventListener('click', (e) => {
      if (e.target.childElementCount) {
        foldBookingDate(e.target);
      } else {
        expandBookingDate(e);
      }
    });

  function foldBookingDate(target) {
    target.children[0].remove();
  }

  async function expandBookingDate(e) {
    const target = e.target;

    if (target.tagName === 'LI' && target.classList.contains('date')) {
      const bookings = await getBookingDetails(target.textContent);

      if (bookings.length > 0) {
        const innerList = document.createElement('ul');
        innerList.classList.add('innerlist');

        for (const booking of bookings) {
          const line = document.createElement('li');
          line.textContent = booking.join(' | ');
          innerList.append(line);
        }

        target.appendChild(innerList);
      }
    }
  }

  async function getBookingDetails(date) {
    const url = `/api/bookings/${date}`;

    let response;

    try {
      response = await fetch(url);
    } catch (error) {
      console.error('Error loading booking details:', error);
    }

    if (response.status === 200) {
      return response.json();
    }
  }

  async function loadBookingDates() {
    const url = '/api/bookings';

    let response;

    try {
      response = await fetch(url);
    } catch(error) {
      console.error('Error retrieving booking dates:', error);
    }

    if (response.status === 200) {
      const responseJSON = await response.json();
      displayBookingDates(responseJSON);
    }
  }

  function displayBookingDates(dateArray) {
    if (dateArray.length > 0) {
      const list = document.createElement('ul');
      list.id = 'outerlist';

      for (const date of dateArray) {
        const line = document.createElement('li');
        line.textContent = date;
        line.classList.add('date');
        list.appendChild(line);
      }

      content.appendChild(list);
    }
  }
});
