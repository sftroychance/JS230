# Project Notes

## Project Name
Form Validation 2

## Description
The previous exercise is a first good step at validating user input. Let's enhance it a bit:

The first and last names aren't validated properly: the user can use numbers in their name. With our current validation rules, the user can get away with using numbers as names. Don't let the user enter invalid characters in these fields.
Solicit a credit card number as four hyphen-separated 4-digit numbers.
Specifications

Use the pattern a-zA-Z'\s to validate user input for first and last names. Use the keypress event to prevent the user from entering a character that doesn't match the pattern.
Add a credit card field to the form. The field should use 4 inputs, all with the same name attribute.
Each credit card input should have a maximum length of 4 characters.
Each credit card input should only allow numeric digits.
The phone number input should only allow numeric digits.
Use the keydown event to prevent the user from entering non-numeric characters in the credit card inputs.

## HTML

## CSS

## JS

notes:
`keypress` is deprecated, but it is useful because if you match only alpha or numeric, it does not also block tab and backspace; `keydown` seems to block these, making form navigation cumbersome.

There apparently is not a good replacement, and some developers are upset that keypress was deprecated because it keeps you from handling certain keys.

For next assignment: Automatic Tab Forwarding
Set that up in this assignment, using `keyup` to check the value of the field and then focusing on the next
