document.addEventListener('DOMContentLoaded', function() {
  const wordContainer = document.querySelector('#word');
  const wordSpaces = wordContainer.children; // live collection
  const guessContainer = document.querySelector('#guesses');
  const gameResult = document.querySelector('#result');
  const playAgain = document.querySelector('#playagain');
  const apples = document.querySelector('#apples');

  const randomWord = function randomWordCreator() {
    const wordList = [
      'acrimonious',
      'salient',
      'disheveled',
      'reciprocate',
      'extol',
      'insular',
      'intrepid',
    ];

    return function randomWordReturn() {
      const index = Math.floor(Math.random() * wordList.length);
      return wordList.splice(index, 1).at(0);
    }
  }();

  function Game() {
    this.currentWord = randomWord().toUpperCase().split('');
    this.maxIncorrectGuesses = 6;
    this.incorrectGuessCount = 0;
    this.guessedLetters = [];
    this.gameOver = false;
    this.bindEvents();
    this.initializeWordContainer();
  }

  Object.assign(Game.prototype, {
    reset() {
      this.currentWord = randomWord()?.toUpperCase().split('');

      if (!this.currentWord) {
        gameResult.textContent = 'Sorry! You are out of words!';
        playAgain.className = 'hidden';
        this.gameOver = true;
        return;
      }

      this.incorrectGuessCount = 0;
      this.guessedLetters = [];
      this.gameOver = false;

      this.initializeWordContainer();
      guessContainer.innerHTML = '';

      gameResult.className = 'hidden';
      playAgain.className = 'hidden';
      document.body.className = '';
      apples.className = 'show_6';
    },

    initializeWordContainer() {
      wordContainer.innerHTML = '';
      htmlString = '<div><p></p></div>'.repeat(this.currentWord.length);
      wordContainer.insertAdjacentHTML('beforeend', htmlString);
    },

    bindEvents() {
      document.addEventListener('keyup', (e) => {
        if (/^[a-z]$/.test(e.key)) {
          this.makeGuess(e.key.toUpperCase());
        }
      });

      playAgain.addEventListener('click', (e) => {
        e.preventDefault();
        this.reset();
      });
    },

    makeGuess(letter) {
      if (this.guessedLetters.includes(letter) || this.gameOver) {
        return;
      }

      this.updateGuesses(letter);

      if (this.currentWord.includes(letter)) {
        this.updateWord(letter);
      } else {
        this.incorrectGuessCount += 1;
        const appleCount = this.maxIncorrectGuesses - this.incorrectGuessCount;
        apples.className = `show_${appleCount}`;
      }

      this.checkGameOver();
    },

    updateWord(letter) {
      for (const [idx, val] of this.currentWord.entries()) {
        if (letter === val) {
          wordSpaces[idx].querySelector('p').textContent = letter;
        }
      }
    },

    updateGuesses(letter) {
      this.guessedLetters.push(letter);

      const htmlString = `<div><p>${letter}</p></div>`;
      guessContainer.insertAdjacentHTML('beforeend', htmlString);
    },

    checkGameOver() {
      const loss = this.incorrectGuessCount >= this.maxIncorrectGuesses;

      const win = this.currentWord.every(letter => {
        return this.guessedLetters.includes(letter);
      });

      if (win) {
        gameResult.textContent = 'Yay! You won!';
        document.body.className = 'win'
      } else if (loss) {
        gameResult.textContent = 'Sorry! You are out of guesses.'
        document.body.className = 'lose'
      } else {
        return;
      }

      this.gameOver = true;
      gameResult.className = '';
      playAgain.className = '';
    }
  });

  new Game();
});
