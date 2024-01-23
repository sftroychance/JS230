function retrieveAllSchedules() {
  const result = document.querySelector('#result');

  const url = '/api/schedules';
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.responseType = 'json';
  request.timeout = 5000;
  request.setRequestHeader('Content-type', 'application/json; charset: utf-8');

  request.addEventListener('load', (event) => {
    const responseData = request.response;

    if (responseData.length === 0) {
      // const resultPara = document.createElement('p');
      // resultPara.textContent = 'There are no schedules available.'
      // result.appendChild(resultPara);
      alert('There are no schedules available.');
      return;
    }

    const staffIDs = [...new Set(responseData.map(({staff_id}) => staff_id))];

    const staffRequests = [];
    for (const id of staffIDs) {
      const url = `/api/schedules/${id}`;
      staffRequests.push(xhrPromise(url));
    }

    Promise.all(staffRequests)
      .then(results => {
        const resultString = results.map(result => result.target.response)
        .map(arr => `staff ${arr[0].staff_id}: ${arr.length}`)
        .join('\n');

        alert('Schedule counts\n' + resultString);


        // let items = results.map(({staff_id}) => `staff ${staff_id}: ${results.length}`);
        // alert(items.join('\n'));
      });



    // const staffTally = responseData.reduce((result, {staff_id: id}) => {
    //   result[id] = result[id] ? result[id] + 1 : 1;
    //   return result;
    // }, {});

    // const resultList = document.createElement('ul');
    // for (const id in staffTally) {
    //   const resultItem = document.createElement('li');
    //   resultItem.textContent = `staff ${id}: ${staffTally[id]}`;
    //   resultList.append(resultItem);
    // }
    // result.append(resultList);

    // let resultMessage = 'Schedule count:\n';
    // for (const [id, count] of Object.entries(staffTally)) {
    //   resultMessage += `staff ${id}: ${count}\n`;
    // }

    // alert(resultMessage);
  });

  request.addEventListener('error', (event) => {
    // const resultPara = document.createElement('p');
    // resultPara.textContent = 'An error occurred retrieving data.'
    // result.appendChild(resultPara);
    alert('An error occurred retrieving data.');
  });

  request.addEventListener('timeout', () => {
    // const resultPara = document.createElement('p');
    // resultPara.textContent = 'A timeout occurred when trying to retrieve data. Please try again.'
    // result.appendChild(resultPara);
    alert('A timeout occurred when trying to retrieve data. Please try again.');
  });

  request.addEventListener('loadend', () => {
    alert('This request has been completed.');
  })

  request.send();

  // API call to obtain all schedules
  // if any schedules available:
  //  - tally schedules for each staff and display results
  // if no schedules avail
  //  - display that there are currently no schedules avail for booking

  // if timeout (5000 msec)
  //  - display message to try again

  // display message about completion of request regardless of success or failure
}

function xhrPromise(url) {
  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.setRequestHeader('Content-type', 'application/json; charset: utf-8');

    request.addEventListener('load', resolve);
    request.send();
  });
}

document.addEventListener('DOMContentLoaded', (event) => {
  retrieveAllSchedules();
})
