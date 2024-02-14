// async function loadUrl(url) {
//   try {
//     let response = await fetch(url);
//     console.log("Got response:", response);
//   } catch (error) {
//     console.log("fetch failed:", error);
//   }
// }

function loadUrl(url) {
  fetch(url)
    .then(response => console.log('Got response:', response))
    .catch(error => console.log('Fetch failed:', error));
}
