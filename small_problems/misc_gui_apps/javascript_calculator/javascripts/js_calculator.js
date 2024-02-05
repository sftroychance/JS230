$(document).ready(function() {
  const $entryLine = $('#current-entry');
  const $historyLine = $('#history');

  const operations = {
    '+': (num1, num2) => num1 + num2,
    '-': (num1, num2) => num1 - num2,
    'x': (num1, num2) => num1 * num2,
    '/': (num1, num2) => num1 / num2,
    '%': (num1, num2) => num1 % num2,
  };

  let entryInProgress = false;
  let currentTotal = 0;
  let operationHistory = '';
  let prevOperator = null;
  let operand1 = null;

  $('#keypad').on('click', 'button', function() {
    const targetFunctions = {
      digit: enterDigit,
      operator: enterOperator,
      c: clearAll,
      ce: clearEntry,
      decimal: enterDecimal,
      neg: enterNegative,
      equals: enterEquals,
    };

    const func = targetFunctions[$(this).data().type];
    func.call(this);
  });

  function enterDigit() {
    const currentEntry = $entryLine.text();
    let newEntry;

    if (entryInProgress) {
      newEntry = currentEntry + this.textContent;
    } else {
      newEntry = this.textContent;
      entryInProgress = true;
    }

    $entryLine.text(+newEntry);
  }

  function enterOperator() {
    const currentEntry = $entryLine.text();

    if (operand1) {
      const operand2 = parseFloat(currentEntry, 10);
      currentTotal = operations[prevOperator](currentTotal, operand2);
      operationHistory += currentEntry + ' ' + this.textContent + ' '
      operand1 = currentTotal;
    } else {
      operand1 = parseFloat(currentEntry, 10);
      currentTotal = operand1;
      operationHistory += currentEntry + ' ' + this.textContent + ' '
    }

    entryInProgress = false;
    prevOperator = this.textContent;

    $entryLine.text(String(currentTotal).slice(0, 15));
    $historyLine.text(operationHistory);
  }

  function clearAll() {
    currentTotal = 0;
    operand1 = null;
    operationHistory = '';
    prevOperator = '';
    entryInProgress = false;

    $historyLine.html('<br>')

    if ($(this).data().type === 'c') {
      $entryLine.text(0);
    }
  }

  function clearEntry() {
    entryInProgress = false;
    $entryLine.text(0);
  }

  function enterDecimal() {
    const currentEntry = $entryLine.text();

    if (entryInProgress && !(/\./.test(currentEntry))) {
      $entryLine.text(currentEntry + '.');
    }
  }

  function enterNegative() {
    const currentEntry = $entryLine.text();
    const number = parseFloat(currentEntry, 10);

    $entryLine.text(-number);
  }

  function enterEquals() {
    if (!prevOperator) {
      return;
    }

    const currentEntry = $entryLine.text();

    const operand2 = parseFloat(currentEntry, 10);
    const finalTotal = operations[prevOperator](currentTotal, operand2);
    $entryLine.text(String(finalTotal).slice(0, 15));

    clearAll.call(this);
  }
});
