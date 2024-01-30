# Assignment
We are refactoring code that is written using jQuery. The HTML file includes a template, and we need to refactor to use Handlebars to process this template.

# What is this app doing?
## Initialization
On DOM load, an object inventory is defined. This contains a collection of items to order and methods to operate on that collection--adding and removing items--with helper methods. An IIFE sets up this object, and an init method is called on the object to initialize the inventory instance.
- setDate() is invoked to place the current date on the page
- a template contained in the HTML file (as a script, not using Handlebars) is copied into the object and removed from the DOM. This template contains the table rows representing inventory items on our page.
- events are bound for:
  - clicking the add item button
  - clicking the delete button for an inventory item
  - inventory item input fields losing focus

## Workflow
Our HTML is displaying a form with some fields we are displaying but not working with for this refactor.

At the end of the form is a list of items to order.
This list is a table, and each row is an item; each row has a link to delete that item.

When the 'add item' button is clicked:
- button event listener invokes newItem()
  - invokes add(), which creates a new inventory object with a new ID and otherwise empty values and adds this to the collection
  - populates the template with the new ID#, including names of form fields (the table containing the inventory is part of the larger form, so all form fields need to have unique names).
  - appends the new table row to the inventory table with blank fields.

When fields in the inventory table row are updated:
- every time an input field loses focus, the info for that item is updated in our data store (the inventory collection)

When the delete button for an inventory item is clicked:
- deleteItem() is invoked
  - removes the item from the DOM
  - invokes remove(), which updates the collection to remove the item

## First impressions
- My first instinct is that the DOM manipulation is mixed in with our collections processing logic, and maybe this is normal for this type of app. This is JS defined for this page, so it must be tightly coupled with the page presentation. The DOM is already represented to us as an object, so maybe it wouldn't make sense to create yet another object to deal with it.

- bindEvents feels like it shouldn't be part of the object, but I can't think of a reason why not.

- We are going to use Handlebars for our template, so we need to register that template as part of our init(), and our new method to process and append the template will replace `cacheTemplate()`

- When we delete an item from our list, the only value we need from the table row is the item ID. I will add this value as a special data attribute on the 'tr' element; this way, the delete link can retrieve the appropriate ID from the parent. Another option is to place this attribute in the 'a' element itself (since we are populating it as part of invoking the template), and that way parent traversal isn't necessary. However, we still need a way to identify this 'tr' element to be able to remove it from the DOM. Placing the id as a data attribute would also help us avoid relying on a hidden id field in the row. (Researching online, it appears this is acceptable for an app that is not submitting data to a server--hidden fields can still be useful if they have to be submitted with a request; in our app we are not interacting with a server, so I will go with the data attribute.)

- the assignment asks for a revision to make variables private; currently, the object returned contains all the properties and methods, so everything is exposed. With an IIFE, we can set private variables and methods and return an object with just the methods we need. The utility methods can be accessed by the object via closure and therefore do not need to be exposed. Is `init()` the only method that actually needs to be exposed?

- given how tightly coupled the inventory object is with the page itself, it almost seems we don't need the object and can just do everything within the `DOMContentLoaded` event listener (which itself keeps us from polluting the global namespace). Perhaps the idea is that the inventory object, once defined, is something that shouldn't be messed with? It might be good practice in terms of encapsulation, in any case.

- As for converting jQuery code, it appears that our jQuery here is limited to:
  - DOM traversal - locating elements to act upon
  - appending and removing DOM elements

- Keep an eye out for frequently accessed elements that we can set at `init()`

# Refactor strategy
- Replace our method of templating.
- Trade out jQuery DOM manipulation, verifying code still works after each step
- Refactor to IIFE with private variables/methods

# notes along the way
- An option for getting all form elements in the table row:
 - get children of grandparent of 'a' element (a.parentElement.parentElement.children) -> (td elements)
  - flat map to children (input/label/button elements)
  - filter for input elements (result only input elements)
  - reduce to object obj[property_name] = value (don't rely on order of elements, verify using the name attribute)
  - iterate over object to assign to our collection item

  - to get id, we get data attribute of 'a' grandparent; let's get rid of the hidden element

# Refactor Progress
- removed `cacheTemplate()`, created `initTemplate()`
- updated `newItem()` to use new template, removed jQuery
- updated `setDate()` to remove jQuery
- updated `get()` to remove jQuery, simplified with for..of
- updated `updateItem()` to remove jQuery
- updated `update` to remove jQuery and iterate over form elements to get values
- updated `deleteItem()` to remove jQuery,
- removed `findParent()` and `findID`; id is now a data attribute on the `li` element
- removed all remaining jQuery

- one issue was trying to use 'blur' as the event to invoke `updateItem()` - had problems with it, and I went down a road thinking the issue was context (this), but that wasn't the case. Turns out we need to use `focusout` for the event

## Creating IIFE with private variables/methods

- IIFE returns an object, assign it to inventory variable
- can make these private:
  - lastID
  - collection
  - setDate
  - add
  - remove
  - get
  - update
- remaining can be public; they don't need to be for our specific application (strictly, everything except `init()` can be private), but it exposes the main methods for other applications; it is the helper methods we are making private

- in all methods, remove `this` reference from all the private methods/variables

### IIFE progress
Updated as indicated and tested
- for input convenience, when adding a new item, set focus to first text field so clicking into it is not necessary
