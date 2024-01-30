# Project Notes

## Project Name
Arithmetic Calculator

## Description
Let's build a simple arithmetic calculator. It will have two inputs for numbers, a selection list that controls which arithmetic operation the calculator performs, and a button that performs the calculation. It will display the result above the inputs. This assignment combines your ability to interact with the DOM with your understanding of event listeners.

Page contents
- Text element to display calculation result
- one one line, in form:
  - input1 text input
  - operator select element
  - input2 text input
  - = button

## Implementation notes
Implementing using native JS, no jQuery.
- on initial solution, used `parseInt()` to convert strings to numbers, but this would not allow decimal values, so changed this to use `Number()`
- I used a switch statement, but LS solution uses a dispatch table; details in lesson notes


## HTML
set up HTML to contain all elements
give unique id to result text element and = button

## CSS
text element is large and in color (blue), maybe h1
remaining elements are inside form
set form display: flex as row, gap 10px; no labels for form elements

## JS
event listener for dom loaded (to contain all code)
event listener for button
- get values of input boxes and operator selector
- switch on operator to calculate result
  - convert strings inputs to numbers
  - thoughtful error message for 0 divisor
- update result text
