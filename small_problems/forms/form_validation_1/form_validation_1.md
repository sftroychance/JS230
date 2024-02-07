# Project Notes

## Project Name
Form Validation 1

## Description
Create a sign-up form that validates each field when it loses focus.

Specifications

Form Controls
The form should have the following controls:
First Name
Last Name
Email
Password
Phone
The form should also have a submit button with the value of "Sign Up".

Validation Rules
The following validation rules apply to the form's fields:

The first name, last name, password, and email fields are all required.
The phone number is optional.
Password must be at least 10 characters long.
Phone number must use US-style numbers: 111-222-3333.
Email should conform to the constraint validation pattern .+@.+ (see below).
Functionality

When a form field loses focus, validate the field value against the validation rule for that field. If the value is not valid, display a red error message to the right of the field. You may also want to add a red border to the input element. The error message should describe what the program expects, e.g., "The password is required."
When a field with an error regains focus, the message should disappear. It should not reappear after the user corrects the field.
When the user clicks the Submit button, don't send the form to the server if it has any validation errors. Instead, display an error message at the top of the page that says "Fix errors before submitting this form."
The form validation error message should disappear when the user corrects all fields with an error.
Implementation

You should not use the built-in error message mechanism. You can disable them with the form element's novalidate attribute.
Use HTML5 constraint validation API and the pattern attribute to implement validations. MDN has a nice article on form validation. Read the section on constraint validation API.
## HTML

## CSS

## JS
