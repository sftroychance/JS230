# Project Notes

## Project Name
Programming Languages Info

## Description
A page that gives a description of one paragraph of a few programming languages of your choice and give the user the option to show/hide a portion of the paragraph.

Create a collection of programming languages of your choice.
Display a heading and a paragraph for each programming language.
Initially, display the first 120 characters for each paragraph.
There is a Show More button for each programming language.
Functionality

When the user clicks the Show More button:

Display the entire paragraph about the corresponding language.
Change the button text to Show Less.
When the user clicks the Show Less button:

Change the button text to Show More.
Hide all but the first 120 characters of the paragraph text.
You can choose any programming languages you want

## HTML
- page heading
- main
  - content div
    - heading
    - paragraph
      - on initial load place two span tags, one for ellipsis and one as a placeholder for remaining text; the first is hidden when full text is shown; the second is always hidden
    - button

## CSS
Basic styling, nothing fancy
two span classes:
- ellipsis - display: none on load; padding-left to distance it from the content slightly
- overflow - text beyond 120 chars display none on load

## JS
Assigment includes an array of programming language info, so my assumption is that I should use a template to populate the page on initial load. Add span elements to the template, as above, and show and hide those with the event handlers.
on DOM load:
  - set the content
event handler for button
  - shows or hides paragraph
  - changes text on button
