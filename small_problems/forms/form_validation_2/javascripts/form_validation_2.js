$(document).ready(function() {

  $('form').on('blur', 'input', function() {
    validate.call(this);
  });

  $('form').on('submit', function(e) {
    e.preventDefault();

    $('form input').not('#submit').each(function() {
      validate.call(this);
    });

    if (isErrorOnForm()) {
      $('#form-error')
        .text('Form cannot be submitted until all errors are corrected.');
    } else {
      submitData.call(this);
      this.reset();
    }
  });

  function submitData() {
    const fields = $(this).find('input').not('#submit').get()
      .map(node => [node.name, node.value]);

    const ccNumber = fields
      .filter(arr => arr[0] === 'credit-card')
      .map (arr => arr[1])
      .join('');

    const data = fields.slice(0, -4);
    if (ccNumber) {
      data.push(['credit-card', ccNumber]);
    }

    const output = data
      .filter(arr => arr[1] !== '')
      .map(arr => arr.map(encodeURIComponent))
      .map(arr => arr.join('='))
      .join('&');

    $('#form-data').text(output);

    // let formData = new FormData($('form').get(0));
    // formData.set('credit-card', ccNumber);
    // let str = new URLSearchParams(formData);
    // console.log(str.toString());
  }

  $('form').on('keypress', 'input', function(e) {
    handleKeypress.call(this, e);
  });

  $('form').on('keyup', 'input[name="credit-card"]', function(e) {
    if (this.value.length === 4 && window.getSelection().type !== 'Range') {
      $(this).next().next().trigger('focus');
    }
  });

  function handleKeypress(e) {
    const name = $(this).attr('name');
    switch(name) {
      case 'first-name':
      case 'last-name':
        if (!(/[a-zA-Z'\s]/.test(e.key))) {
          e.preventDefault();
        }
        break;
      case 'credit-card':
        if (!(/\d/.test(e.key))) {
          e.preventDefault();
        }
        break;
      case 'phone':
        if (!(/[\d-]/.test(e.key))) {
          e.preventDefault();
        }
    }
  }

  function validate() {
    const error = getError.call(this);

    if (error) {
      $(this).addClass('error');
    } else {
      $(this).removeClass('error');
    }

    $(this).next('p').text(error || '');

    if ($(this).attr('id') === 'credit-card-4') {
      validateCreditCard.call(this);
    }

    if (!isErrorOnForm() && $('#form-error').text()) {
      $('#form-error').text('');
    }
  }

  function validateCreditCard() {
    const ccNumber = $('[name="credit-card"]')
      .get()
      .map(node => node.value.trim())
      .join('');

    if (/\d{16}/.test(ccNumber) || ccNumber ==='') {
      $(this).next('p').text('');
    } else {
      $(this).next('p').text('Invalid credit card number.');
    }
  }

  function getError() {
    if ($(this).attr('name') === 'credit-card') {
      return;
    }

    const validity = this.validity;

    if (validity.valid) {
      return;
    }

    if (validity.valueMissing) {
      const fieldName = $(this).attr('name').replace('-', ' ');
      const printName = fieldName[0].toUpperCase() + fieldName.slice(1);
      console.log(fieldName);

      return `${printName} is a required field.`
    }

    if (validity.typeMismatch) {
      if (this.type === 'email') {
        return 'Please enter a valid email address.';
      }
    }

    if (validity.patternMismatch) {
      if ($(this).attr('id') === 'phone') {
        return 'Please enter a valid phone number.'
      }
    }

    if (validity.tooShort) {
      return 'This field should be at least ' + $(this).attr('minlength')
        + ' characters';
    }
  }

  function isErrorOnForm() {
    return $('.validation-error').get().some(ele => ele.textContent !== '');
  }
});
