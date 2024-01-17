'use strict';
async function testingAwait() {
  try {
    // let message = await Promise.resolve('success');
    // let errorState = await Promise.reject(message);

    // let message = await Promise.resolve('success')
    // let message = await new Promise((resolve, reject) => {
    //   resolve('success');
    // }).then (message => {
    //     Promise.reject(message);
    //   });

    let message = await new Promise((resolve, reject) => {
      resolve('success');
    }).then(message => Promise.reject(message));

    // let nextMessage = await Promise.reject(message);
  } catch (e) {
    console.log('error caught!', e);
  }
}

testingAwait();
