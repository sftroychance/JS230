# Project Notes

## Project Name
Guess a Word

## Description
A web-based word guessing game. A word is selected at random, and the user is presented with the blank spaces indicating the word size and empty letter slots. The user makes letter guesses; if they are correct, the corresponding blanks are filled and the letter is placed in a 'guesses' field; if the guess is incorrect, the guessed letter is placed in a 'guesses' field. The user gets a limited number of guesses and loses the game if that is exceeded before the word is solved. A win or lose message is shown, and the user is given the option to play again.

A tree graphic with apples indicates the number of guesses remaining; each time an incorrect guess is made, an apple is removed from the tree.

## HTML
- div to contain gameplay; patterned background
- tree graphic (provided)
- apple grapic (provided - sprite image)
- win/lose message (hidden until end of game) p element
- play again link (hidden until end of game) a element
- word: label with series of div elements, each with a bottom border and containing p or span elements (if necessary)
- guesses: label with div elements as above

## CSS
- learn to work with a sprite image and position as appropriate superimposed on tree image
- div formatting for each letter in word and guesses
- all letters in caps
- patterned background image (white during game play, red on loss, blue on win) - graphic no longer available but can seek one

## JS
- keyup events
  - checks key code pressed, converts to uppercase
  - ignore letter if is has already been guessed
  - checks if letter is in target word
    - if so, add to word list and guesses list
    - if not
      - add to guesses list
      - decrement allowed guesses counter
      - change apple sprite image
