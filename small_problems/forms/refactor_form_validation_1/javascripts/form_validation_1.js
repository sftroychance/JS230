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
      this.reset();
    }

  });

  function validate() {
    const error = getError.call(this);

    if (error) {
      $(this).addClass('error');
    } else {
      $(this).removeClass('error');
    }

    $(this).next().text(error || '');

    if (!isErrorOnForm() && $('#form-error').text()) {
      $('#form-error').text('');
    }
  }

  function getError() {
    const validity = this.validity;

    if (validity.valid) {
      return;
    }

    if (validity.valueMissing) {
      const fieldName = $(this).attr('id').replace('-', ' ');
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
