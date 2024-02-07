$(document).ready(function() {
  const validators = {
    'first-name': { required: true },
    'last-name':  { required: true },
    email:        { required: true, valid: /^.+@.+\..+$/ },
    password:     { required: true, valid: /^\S{10,}$/ },
    phone:        { required: false, valid: /^\s*$|^\d{3}-\d{3}-\d{4}$/ },
  };

  $('form').on('focusout', 'input', function(e) {
    checkField.call(this);

    if ($('#form-error').text() && !isErrorOnForm()) {
      $('#form-error').text('');
    }
  });

  $('form').on('focusin', 'input', function(e) {
    $(this).removeClass('invalid');

    const $errorMessage = $(this).next();
    $errorMessage.text('');
  });

  $('form').on('submit', checkForm);

  function checkField() {
    const $errorMessage = $(this).next();
    const fieldName = $(this).attr('name');
    const fieldValue = $(this).val().trim();
    const printName = fieldName.split('-')
      .map(word => word[0].toUpperCase() + word.slice(1))
      .join(' ');

    if (validators[fieldName].required && fieldValue === '') {
      $errorMessage.text(`${printName} is a required field.`);
      $(this).addClass('invalid');
      return;
    }

    const validation = validators[fieldName].valid;
    if (validation) {
      if (!validation.test(fieldValue)) {
        $errorMessage.text(`Please enter a valid ${fieldName}`);
        $(this).addClass('invalid');
      }
    }
  }

  function checkForm(e) {
    e.preventDefault();

    $('input').not('#submit').each(function() {
      checkField.call(this)
    });

    if (isErrorOnForm()) {
      $('#form-error')
        .text('Form cannot be submitted until all errors are corrected.');
    } else {
      this.reset();
    }
  }

  function isErrorOnForm() {
    return $('.validation-error').get().some(ele => ele.textContent !== '');
  }
});
