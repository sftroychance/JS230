# Project Notes

## Project Name
Context Menu for Todo App

## Description
In the previous exercise, you create a todo list application that uses a confirmation dialog when deleting a todo. Make the following changes to your solution.

The program should function in the same way as the previous version except as follows:

When the user right clicks a todo item, display a context menu.
The context menu has three items:
Show Details
Edit Todo
Delete Todo
You don't need to add functionality for Show details and Edit Todo.
When the user clicks the Delete Todo option, display the confirmation dialog.

## HTML
create div to serve as context menu
p elements for menu items (containing span with google icon)

google icons for context menu
delete <span class="material-symbols-rounded">delete</span>
edit <span class="material-symbols-rounded">edit</span>
details <span class="material-symbols-rounded">description</span>

## CSS
style div
positioning: need to be sure it does not fall off edge of screen

learned transform scale(0) to scale(1) so we can pick an origin corner
the transform origin corner is top left (the menu slides in from top left), but if the user clicks too close to the edge of the page, the context menu needs to originate from the top right (if too close to the right) or bottom left (if too close to the bottom) or bottom right (if too close to both)

a new class is defined to show the menu; on the menu, display:none is not needed because it is set at scale(0); the show class changes it to scale(1)

learned context menu positioning based on window width/height and context menu width/height

## JS
event handler for contextmenu (right click)
- check for positioning of context menu so it does not render partially off screen
- set the data-id value of the context menu to the todo id that was clicked on (there are multiple potential actions on the menu that will require that id)
- gotcha: remember when we are reading css values via jquery, they are strings

event handler on document to handle click (to hide the context menu if anywhere else is clicked)
- hides context menu

event handler for clicking on delete in context menu
- opens modal
- just as with clicking the delete button, the todo id is set as a data attribute on the 'yes' button inside the modal
- just by chance, the reference to retrieve the data id value is the same for clicking the delete button as it is for clicking the delete menu item in the context menu:
`$(this).parent().data('id')`
  - the parent of the delete button is the li, which has the id data attribute
  - the parent of the delete menu item is the context menu, which (when it was opened) had the id set as its data attribute


  had some frustration with setting the correct values when the context menu is too close to the edge of the screen. used the scale transformation, which worked fine; you set the origin for top/right bottom/left, etc, but you have to set the top and left values:
  - top - if too close to the bottom: clientY - window.innerHeight - 10
  - left - if too close to the right: clientX - window.innerWidth - 10
  So you set the origin to the correct corner, but you still position the menu div with respect to the top left corner of the final position of the div. It looked better when i subtract 10 from those values (the corner shows up exactly where the screen was clicked) - I think that value reflects the border-radius value of 5 on each end.
