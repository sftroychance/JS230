// The code below is buggy. The person who created the code expects that nothing
// will happen when the user clicks on the image. This, however, isn't the case;
// clicking the image still brings the user to another web page.

// Study the code and explain the bug.

// the bug is that the user wants to prevent the default behavior of clicking
// the image (which is that it will go to a new page) but is using stopPropagation
// instead of preventDefault().

// The 'false' in the `addEventListener` is superfluous, as the default is `false`
// but also this is the target element and it contains no other elements, so
// bubbling and capture are irrelevant here.

// A lesson here is that `preventDefault()` will prevent the default actions defined
// on an ancestor element when the current element is the target of the event. it prevents
// ANY default action that results from the event--it cancels the event entirely.

<a href="https://www.launchschool.com">
  Home
  <img src="https://d24f1whwu8r3u4.cloudfront.net/assets/launch-logo-b6d01bd15ee9da31457ee3c315845718823aa8a741858be598ab35042a312348.svg" />
</a>

document.querySelector('img').addEventListener('click', event => {
  event.stopPropagation();
}, false);

// fix

document.querySelector('img').addEventListener('click', event => {
  event.preventDefault();
});
