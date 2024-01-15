// Given the following markup, implement distinct context menus for the main and
// the sub areas of the web page. You can represent a context menu as an alert
// box that displays the name of the respective area (i.e., alert("sub")). Only
// one context menu should appear when the event occurs.

// solution:
// the name of the event here is 'contextmenu'
// this event is right-clicking the element
// by default, a menu pops up, and we want to override that,
// so we need to do `event.preventDefault()`
// also, we need to `event.stopPropagation()` in the sub element
// so the `main` event listener does not fire also.

{/* <main>
  Main Area
  <section id="sub">
    Sub Area
  </section>
</main> */}

// main, #sub {
//   padding: 15px;
// }
// main {
//   width: 100%;
//   height: 200px;
//   background: blue;
//   color: white;
// }

// #sub {
//   position: relative;
//   top: 100px;
//   left: 15px;
//   background: red;
//   height: 50px;
//   width: 50%;
// }

const main = document.querySelector('main');
const sub = document.querySelector('#sub');
console.log(sub);

main.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  alert('main');
});

sub.addEventListener('contextmenu', function(event) {
  event.preventDefault();
  event.stopPropagation();
  alert('sub');
});
