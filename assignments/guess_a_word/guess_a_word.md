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


# Implementation notes
- wrote html and css
- pulled background svg image and associated css from demo page
- reviewed how to use a sprite image; wrote css classes to display appropriate zone of image
- implemented letters as individual div elements inside a flexbox
html structure:
game div
- tree img
- apples (sprite) in div
- hidden result and playagain lines
- word div
- guesses div

Per assignment:
- wrote randomWord() function
- the LS solution is concerned with polluting the global namespace; my code is within a `DOMContentLoaded` event listener, so nothing within will pollute the global namespace
- for the sake of practice and encapsulation, used IIFE to create function with private word list variable

- created Game constructor
- created methods:
  - play for game loop
  - gameSetup to initialize values
  - initializeWordContainer to display blanks on page
  - bind events
    - keyup event to call makeGuess
  - makeGuess to check entered letter

- defined updateWord and updateGuesses
- for updateWord, I iterate over the word itself, and if the guess is correct for a letter, I add it to the corresponding (via index) 'p' element in the displayed word

# comparison with LS solution
- LS breaks actions down into smaller functions, which I think adds to consistent levels of abstraction (as opposed to mixing function calls with other statements).
- In my solution, when the game is won or lost, I set a gameOver flag, and when the event listener detects a keyup, I just ignore it if gameOver is true (to prevent letters being added to guessedLetters after the game has ended); the LS solution, instead, unbinds the event listener, which is probably a more standard solution. To do so, you have to use a named function for the listener callback (to unbind, you must provide the event name and the callback name, and you must call `removeEventListner()` on the same element that called `addEventListener()`). Another option would be to use `abortController`

```javascript
const controller = new AbortController;

element.addEventListener('click', (event) =>{
        console.log(event.target.name, "clicked")
    }, { signal: controller.signal })
}

// to unbind
controller.abort();
```

- my solution considers a 'game' to be cycling through all the words (thus, I have a reset function after every word, though it repeats code--probably better to just have a setup method to call for initialization and reset); the LS solution instantiates a new Game for every new word

- the LS solution sets the default CSS display value as `none` for the playAgain link, and then uses another class to make it visible; I've read that best practice is the opposite, to set the default as visible and have a class that hides it.

- the LS solution sets the apples image as absolute with the tree set as relative; my solution sets apples as absolute relative to the entire page. LS probably has the better solution here; in my solution, if we decide to move the tree image, would would also have to reconfigure the position of the apples image. I made this change (originally I had the tree as an img and apples as a div following that; I changed this to making tree a div and apples a div inside the tree div, and the positioning works; if I change the position of the tree, the apples img is also repositioned appropriately).

# refactor ideas
- instead of hard-coding word list, obtain word at random from a word list api: https://random-word-api.herokuapp.com/home
  - can retrieve words of particular length, so we can randomize length for the request
  - can also set language
- keeping score
- score bonus for faster solutions
  - extra challenge: the game times out if not solved quickly enough
- being presented with the blanks for the word, then making a 'bet' on how many filled-in letters it would take for you to solve the word (like a combination of Name That Tune and Wheel of Fortune)
- animation for apple falling out of tree and randomly bouncing around bottom of screen (would need a separate image file for the apple graphic, or could create an img that targets a one-apple zone in the sprite). could even have it remain at bottom of screen for the entire game.
- when the game ends in a loss, reveal the answer with the missing letters in red


