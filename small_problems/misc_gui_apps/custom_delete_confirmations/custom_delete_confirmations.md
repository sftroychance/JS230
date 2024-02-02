# Project Notes

## Project Name
Custom Delete Confirmation Prompt
## Description
Create an application that displays a list of todos. When the user wants to delete a todo, the application should show a custom confirmation dialog.

Create a list of todos in the DOM from a JavaScript collection (array) of todos.
Add a delete button for each todo.
When the user clicks the delete button, a dialog appears asking the user to confirm the deletion.
Use CSS to display the dialog.
The dialog has Yes and No buttons.
When the user clicks the Yes button, the dialog disappears, and the corresponding todo is deleted.
When the user clicks the No button, the dialog disappears, and the todo is not deleted.
You can start with a collection of your choice. Here's the collection used in our demo app:

todo_items = [
  { id: 1, title: 'Homework' },
  { id: 2, title: 'Shopping' },
  { id: 3, title: 'Calling Mom' },
  { id: 4, title: 'Coffee with John '}
];

You can use the id property for each todo object to identify the todo item to remove from the DOM. Most applications use a data-id HTML attribute to identify DOM items.

## HTML
handlebars template for each todo item
delete button icon?

body
- div modal overlay (hidden)
- div modal dialog
  - p
  - no button
  - yes button
- main
  - heading 'Todos'
  - ul
  [template]
    - li
      - div (if I can't fully style li)
      - p todo description
      - img or button delete button
  [/template]

## CSS
- all style divs rounded corners
- div modal overlay: transparent, block click events (can do this in css)
- div modal dialog: position absolute
  - green yes, red no

- li: flex, justify space between

## JS

load page
- compile template
- load todo items via template
- add event listeners to todo delete and both modal buttons

todo delete event
- show modal for confirmation

modal yes
- hide modal and overlay
- remove todo from todo array
- remove todo line from DOM

modal no
- hide modal and overlay
