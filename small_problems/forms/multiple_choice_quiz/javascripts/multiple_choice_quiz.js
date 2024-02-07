$(document).ready(function() {
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

  const templates = {};

  function prepareTemplates() {
    const $templateScripts = $('[type="text/x-handlebars"]');
    const $partialScripts = $templateScripts.filter('.partial');

    for (const template of $templateScripts) {
      templates[template.id] = Handlebars.compile($(template).html());
    }

    for (const partial of $partialScripts) {
      Handlebars.registerPartial(partial.id, templates[partial.id])
    }
  }

  function loadData() {
    for (const question of questions) {
      $(templates.question(question)).insertBefore('.buttons');
    }
  }

  function bindEvents() {
    $('form').on('submit', submitQuiz);
    $('form').on('reset', resetQuiz);
  }

  function resetQuiz() {
    $('#submit-quiz').removeClass('disabled');
    $('.answer').removeClass('no-answer wrong-answer right-answer');
  }

  function submitQuiz(e) {
    e.preventDefault();

    if ($('#submit-quiz').hasClass('disabled')) {
      return;
    }

    const formData = new FormData(this);
    for (const [question, answer] of formData) {
      const $answer = $(`#${question} .answer p`);

      const key = question.replace('q_', '');

      let correctAnswer = answerKey[key];
      let message;
      if (answer === correctAnswer) {
        message = 'Correct Answer.'
        $answer.parent().addClass('right-answer');
      } else {
        message = `Wrong Answer. The correct answer is "${correctAnswer}".`;
        $answer.parent().addClass('wrong-answer');
      }

      $answer.html(message);
    }

    $('.answer')
      .not('.right-answer')
      .not('.wrong-answer')
      .each(function() {
        const id = $(this).parent().attr('id').replace('q_', '');
        const correctAnswer = answerKey[id];

        $(this).addClass('no-answer');
        $(this).find('p').text(
          `You didn't answer this question. Correct answer is "${correctAnswer}"`
        );
      });

    $('#submit-quiz').addClass('disabled');
  }

  prepareTemplates();
  loadData();
  bindEvents();
});
