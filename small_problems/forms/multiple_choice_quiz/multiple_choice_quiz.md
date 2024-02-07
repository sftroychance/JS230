# Project Notes

## Project Name
Multiple Choice Quiz

## Description
For this project, build a multiple choice quiz application that uses an answer key to mark questions right or wrong.

Specifications

You can use the question collection shown below or a collection of your choice.
Render the question collection to the page. Each question should let the user select a radio button to choose one of four possible answers.
Add a Submit and Reset button.
When the user clicks the submit button, mark each question as correct, wrong, or unanswered.
When the user supplies a correct answer, display a "Correct Answer" message beneath the radio buttons for that question.
When the user supplies an incorrect answer or fails to answer the question, display an appropriate error message and the correct answer beneath the radio buttons for that question.
Disable the Submit button after the user submits the quiz.
When the user clicks the Reset button, clear all selected radio buttons and messages and enable the Submit button.

const questions = [
  {
    id: 1,
    description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
    options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
  },
  {
    id: 2,
    description: 'Which of the following numbers is the answer to Life, the \
                  Universe and Everything?',
    options: ['66', '13', '111', '42'],
  },
  {
    id: 3,
    description: 'What is Pan Galactic Gargle Blaster?',
    options: ['A drink', 'A machine', 'A creature', 'None of the above'],
  },
  {
    id: 4,
    description: 'Which star system does Ford Prefect belong to?',
    options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
  },
];

const answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' };

## HTML
div for layout (main)
h1
form
div template:
  question template that uses partial for answers
  answer template partial
  p Question
  ul answers
    answers: radio button inside label element?
    makes it easier for screen readers and also if you click the label, the button is selected:
     <label>
      <input type="radio" name="indoor-outdoor">Indoor
    </label>
  div for solution
    p
## CSS
layout div flex column

answer ul flex column

question result div
- red border if incorrect

## JS
render templates
bind events
  - form submit - one time only (jquery supports this)
    - check each answer and display result for each question

# notes
For the form button, I could not use the `.one` jQuery method because it removes the event listener after one submit, which means we cannot `preventDefault()` for the submit action of the button.
