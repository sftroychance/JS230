# Project Notes

## Project Name
WYSIWYG JavaScript Editor

## Description
Create a Rich Text editor that lets users edit text in a WYSIWYG (What You See Is What You Get) manner.

Specifications

Controls

The WYSIWYG editor should let users:

Enter text.
Make text bold.
Italicize text.
Underline text.
Strike-through text.
Create a link from some text.
Create an unordered list.
Create an ordered list.
Align text to the right, left, center, and fully-justified.

Use the following documents as a reference for this project:

https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand*
The first two paragraphs of reference 2 are a bit confusing: you do not need to set designMode to use the execCommand API, nor should you turn it on.

*Please note that MDN indicates that execCommand has been deprecated. While you should not use this method in production, it will suit our needs for the purpose of this exercise. Lack of support is primarily centered around the ClearAuthenticationCache, defaultParagraphSeparator, and insertBrOnReturn commands.

## HTML

h1
main
- commands div flex row wrap
  - buttons (generate with handlebars)
- editable p?

## CSS
mainly button formatting
- buttons each show an icon (all icons avail in google icons font)
- buttons each link to a specific method on `execCommands()`

## JS
- event listener on parent div for all the buttons
  - set focus back on p element after button clicked
  - show highlighted button when in effect (right now it's just on css hover for the button)

`execCommand` works ok so far--the main addition is that when you are setting a link you have to prompt for the url (and that's functionality you have to set up yourself, sending the resulting value to the method as the third arg).

you can look at the $('p').html() to see the formatting as it is applied with html tags.

All the formatting works so far.  The next challenge is that the buttons on the demo app are highlighted if the current selected text or insertion point has that formatting applied.

My strategy:
- set event listeners for selecting text or selecting an insertion point
- select all the parents of that element up to the 'p' element
- for each button, if the html formatting tag is in the parents, then highlight the button

I will study text events--clicking into an editable text field should give some event feedback for where you are in the text; we need to find the selection/insertion point to determine the parents.

