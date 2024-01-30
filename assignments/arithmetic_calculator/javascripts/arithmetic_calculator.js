document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('#calculate').addEventListener('click', () => {
    const form = document.querySelector('form');

    const value1 = Number(form.input1.value);
    const value2 = Number(form.input2.value);

    let result;
    switch(form.operator.value) {
      case '+':
        result = value1 + value2;
        break;
      case '-':
        result = value1 - value2;
        break;
      case '*':
        result = value1 * value2;
        break;
      case '/':
        result = value2 ? value1 / value2 : 'Cannot divide by zero';
        break;
    }

    document.querySelector('#result').textContent = result;
  });
});
