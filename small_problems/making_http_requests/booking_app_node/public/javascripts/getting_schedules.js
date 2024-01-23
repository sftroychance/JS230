function scheduleCountPerStaff() {
  const url = '/api/schedules';

  const request = new XMLHttpRequest();
  request.open('GET', url);

  request.responseType = 'json';
  request.setRequestHeader('Content-type', 'application/json; charset: utf-8');
  request.timeout = 5000;

  request.addEventListener('load', () => {
    const responseData = request.response;

    if (responseData.length === 0) {
      alert('There are no schedules available.');
      return;
    }

    // original solution for getting schedule counts:
    // const staffTally = responseData.reduce((result, {staff_id: id}) => {
    //   result[id] = result[id] ? result[id] + 1 : 1;
    //   return result;
    // }, {});
    //
    // let resultMessage = 'Schedule count:\n';
    // for (const [id, count] of Object.entries(staffTally)) {
    //   resultMessage += `staff ${id}: ${count}\n`;
    // }

    // alert(resultMessage);

    // Further exploration solution
    const staffIDs = new Set(responseData.map(({staff_id}) => staff_id));

    const requestPromises = [];
    for (const id of staffIDs) {
      requestPromises.push(xhrPromise(`/api/schedules/${id}`));
    }

    Promise.all(requestPromises)
      .then(responses => {
        const result = responses.map(schedules => {
          return `staff ${schedules[0].staff_id}: ${schedules.length}`;
        }).join('\n');

        alert('Schedule counts:\n' + result);
      })
      .catch(errorMessage => alert(errorMessage));
  });

  request.addEventListener('error', () => {
    alert('An error occurred retrieving data.');
  });

  request.addEventListener('timeout', () => {
    alert('A timeout occurred when trying to retrieve data. Please try again.');
  });

  request.addEventListener('loadend', () => {
    alert('This request has been completed.');
  })

  request.send();
}

function xhrPromise(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.setRequestHeader('Content-type', 'application/json; charset: utf-8');

    request.addEventListener('load', (e) => resolve(e.target.response));
    request.addEventListener('error', () => reject('Unable to retrieve data.'));
    request.send();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  scheduleCountPerStaff();
});
