# Project Notes

## Project Name
JavaScript Calculator

## Description
Build A GUI standard calculator with the following specifications:

Specifications

Calculator screen

The calculator should have a screen like a standard calculator. The screen should have two parts:

A lower part—the entry window—that shows the current entry: the number you are entering or the most recent result.
An upper part—the operation window—that shows the operation in progress, e.g., 1 + 5 / 2 +.
Calculator buttons

The calculator should have functioning buttons for the following:

All digits: 0-9
., +, -, /, *, %, =, NEG, C, CE
The NEG button negates the value in the entry window.
The CE button clears the entry window and replaces it with 0.
The C button clears both the entry and operation windows and leaves a value of 0 in the entry window.
Operations

When the user clicks a digit button, append the digit to the number in the entry window. If the value in the entry window is 0, replace the 0 with the entered digit.
When the user clicks an operator button, copy the current entry and the operator into the operation window. You can leave the current entry in the entry window or set it to 0, but, either way, the next digit entered should begin a new number.
When the user clicks the = button, use the current operation and the current entry to calculate the final result. Clear the current operation window and display the result in the entry window.

Notes on demo:
- When you click an operator, the entry window shows the calculated value up to this point.
- a decimal clicked before a number is ignored--must enter '0.5' not '.5'
- divide by 0 shows infinity
- you can make Infinity negative, but you can't divide by a negative 0
- you can't enter a -0
- if you are entering a negative value, you must hit NEG after entering the number; if you enter it before, if you just entered an operation key, the neg will be ignored; if there is a value in the window, it will make that value negative
- if you hit two operators in a row, the first operator will execute with the value in the window as the second operand, and that will be the first value of the next operator

## HTML

## CSS

## JS
