# Implementation Notes: Contact Manager

## Assignment
Here's a practice project that you can use to prepare for the actual take-home project.

Implement the Contact Manager app here:

http://devsaran.github.io/contact-manager-backbone/

You should implement all the features there, including the search. Also, implement a "tagging" feature, which allows you to create tags, such as "marketing," "sales," "engineering," and when you add/edit a contact, you can select a tag to attach to the contact. Finally, you can click on a tag and show all the contacts with that tag. The UI isn't too important here since the focus is on the functionality. The other difference between the project in the link and the one you'll develop is that your application will have an API server to store and retrieve contacts.

## First impressions (viewing Demo)
- the API server generates the ID, which is returned with all other info when a new contact is added

- Search field searches only on name
  - Filters with every letter typed into the search field, any letter or substring that matches the name works (not just beginning of a name)
- phone number is a text field that will take any value (no validation, escapes HTML)

- name field is string of any desired length

- email does have validation attached to the form itself (Constraint API?)

- The API indicates that only the name field is required for a contact, but the demo app requires all fields be filled out to submit the form

  - error messages for empty fields appear only on form submit and do not disappear when text in the fields is updated

- tags are not implemented in the demo app; we're to create our own implementation
    - first impression: as I've seen before, a tags field that appears to be a regular text field. you can type a tag name into it, and on enter a new tag will be created, which appears as a button with an 'x' to delete the tag. The requirements don't indicate if the tag is searchable in the search field, but we do need to return a result when clicking on the tag (filtering results to those containing that tag)

- contacts appear sorted by ID (listed in order entered)

- layout appears flex with wrap; the longest entry on a row sets the size of the row (the top lines of all rows line up)

- gray border along bottom of contact entry


- responsiveness:
   - rows rewrap on changing width (max 4 across), when width is 3 across, a long entry can be lined up with two shorter entries in the same space--is this flex or grid?
   - goes from 3 across to 1 across (no 2-across layout)'

- events:
  - Enter key on all form fields submits 'create' form
  - tab and shift-tab both work for navigating fields
  - edit and delete buttons (appear to be anchor tags) for each contact on main contact listing
    - delete has verification alert
  - submit and cancel buttons on 'create' form

## HTML
One-page app

Header:
h1 page title
h2 short description

main:
  div subheader:
    button: add contact
    search label and text field

  div contacts listing
    - div contact
      - h3 name
      - phone number (h4 label, p text)
      - email (h4 label, plain text)
      - div tags
        - button-style (anchor maybe?)

  div create contact (possibly do not need div to contain it)
    - form
      - full name label and text field
        - hidden error message
      - email label and text field (with validation)
        - hidden error message
      - telephone label and text field
        - hidden error message
      - tags label and simulated text field
        - button-style tags within this field, in addition to text entry
      - submit button
      - cancel button

  div edit contact
  - same as create contact but with field values filled in
  - might use same div and just change heading and default field text for each
  - buttons will be attached to different actions than 'create contact' versions (or at least the submit button) (or, more strictly, form method and action will be different)

### Templates - handlebars
- Contacts listing, references partial 'contact'
- Contact partial

## CSS

general:
- all buttons reverse color and background color on hover
header: height adjusts to content with page width adjustment (so not fixed height); purple color in demo

main div sets the width of the subheader and contacts listing; flex column
- has a minimum width with page width decrease (page width will not decrease beyond that)

subheader div: light gray background in demo; flex column
- button and search field on same row; column format when page width decreased
  - add contact button fixed size
  - search text field width varies slightly on page width adjustment

contacts listing div: flex row with wrap; longest contact sets row height
- 4 across default, shrinks to 3 then 1 with page width decrease
- with 3-across, one large contact div can take up two rows of smaller contact divs; however, this is with testing on very long field values, which won't be practical for this particular app anyway (the field sizes are self-limiting per field definition)

contact div: flex column (including text labels)
- two buttons in same row
- at bottom: button-style color-background tags (multiple colors, maybe?) that are clickable to reset contacts listing for all contacts matching that tag

contact create div
- form, flex column
- bottom buttons on same row
- slides up from bottom when 'add contact' button clicked
- main div slides up also after 'submit' or 'cancel' buttons clicked
- error messages in red, hidden, after each text field (error if empty when submitting form)
  - on error, label of the offending text field also turns red, as does text field border
    - error formatting does not go away when the field is updated with text (remains until submit or cancel button is clicked)

edit contact div
- same formatting as create contact div, including slide-up behaviors

## JS
- jquery
- defer script and place everything in document.ready block

- page load
  - compile templates, register partial
  - ajax get request for all contacts
  - render page using templates
  - bind events

- Events
  - ajax GET every time main page is loaded
    - could it be optimized to only manipulate loaded data and add/remove dom elements on create/delete? then do this API query only when page is completely reloaded
  - Edit contact click ajax GET for single contact vs using existing data
    - existing data shouldn't be a problem since contacts listing ajax get will execute every time main page loads
  - delete contact click ajax delete
  - submit create contact click (form submit) ajax post
  - cancel create contact click
  - submit edit contact click (form submit) ajax put submit ONLY changed fields
  - cancel edit contact click
  - keydown on create/edit forms:
    - Enter key causes form submit
  - search field input event - update contact listing (re-render full listing each time)
    - might be able to optimize and not re-render when result data set has not changed--perhaps hash the data object value to compare results?
    - debounce not necessary since we are querying loaded data, not submitting ajax for each search

- Object creation patterns
  - we are not instantiating multiple contact list instances, so a class seems like overkill here; however, it feels like we should implement some pattern--maybe an IIFE for encapsulation--to maintain private variables and expose only certain methods? We already do not pollute the global namespace because our code is inside DOM ready event.
  - keep in mind maintaining consistent levels of abstraction
    - single responsibility for all methods
    - event callbacks are not inline but separate functions
    - init method just calls methods

## MVC view of the application (trying this out)
Model:
  local data only
  can be a simple object rather than a class
  methods:
    filterByTag
    filterByName
    addContact
    removeContact

View:
  all knowledge of the page (DOM elements) is here
  interacts with Model to load data for page view
  bind events (event handlers in controller)


Controller:
  app initialization (create model and view)
  API interactions (link to API might be separate class)
  event handlers:
    submit new contact form:
      gather data
      call api to update
      update model
    submit edit contact form:
      gather changed data
      call api to update
      update model
    input search (maybe better in view? doesn't need API call)
      call model to get filtered data
    delete contact
      call api to delete
      update model

## notes
- move event handling to the controller - much easier
- don't allow duplicate tags
- add template for no-search-result
- duplicate HTML for edit and create contact--use a template?



add/edit:
- create shared template
  - differing values
    - if edit, do API query for id and fill in fields
    - if edit, add data-id field to form to reference when submitting
    - different name for submit button
    - different heading
for add new contact:
- gather data
- submit

for edit new contact:
-
