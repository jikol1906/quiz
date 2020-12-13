$(document).ready(function () {
  var theQuestions = [
    {
      question:
        ' Mit Unterstützung und Verständnis zum Umgang mit SES können Betroffene soziale, akademische und berufliche Erfolge erreichen.',
      answer: true,
      details:
        'Mit qualitativ hochwertiger Unterstützung, gesellschaftlicher Anerkennung und Verständnis zum Umgang mit SES können Betroffene soziale, akademische und berufliche Erfolge erreichen.',
    },
    {
      question:
        'Menschen mit einer SES können Schwierigkeiten beim Schriftspracherwerb haben.',
      answer: true,
      details:
        ' Eine SES wird mit Lese-Rechtschreibstörungen in Verbindung gebracht, da der Schriftspracherwerb von den sprachlichen Fähigkeiten abhängt. Auch weitere Lernstörungen können auftreten.',
    },
    {
      question:
        'Eine SES ist eine unsichtbare Beeinträchtigung die ca. bei 1 von 14 Personen auftritt.',
      answer: true,
      details:
        'Menschen mit einer SES sehen nicht anders aus als Gleichaltrige. Eine SES ist unsichtbar.',
    },
    {
      question: 'Menschen mit einer SES sind nicht intelligent.',
      answer: false,
      details:
        'Menschen mit einer SES haben unabhängig von deren Intelligenz Schwierigkeiten beim Produzieren und/oder Verstehen von Sprache.',
    },
    {
      question:
        'Bei zweisprachigen Personen mit einer SES ist nur eine Sprache betroffen, die andere nicht.',
      answer: false,
      details:
        'Liegt eine SES vor, sind alle Sprachen, die diese Person spricht, davon betroffen.',
    },
    {
      question:
        'Kinder mit einer SES können auch Schwierigkeiten in den Bereichen Aufmerksamkeit, Fein- und Grobmotorik und Verhalten aufweisen.',
      answer: true,
      details:
        'Obwohl die Sprachentwicklung das Hauptproblem darstellt, kann eine SES oft mit Beeinträchtigungen in anderen Bereichen der Entwicklung einhergehen.',
    },
    {
      question:
        'Jugendliche mit einer SES profitieren nicht von einer sprachtherapeutischen Behandlung.',
      answer: false,
      details:
        'Untersuchungen zeigen, dass Jugendliche von sprachtherapeutischer Unterstützung profitieren.',
    },
    {
      question:
        'Nur Kinder mit niedrigem sozioökonomischen Hintergrund sind von einer SES betroffen.',
      answer: false,
      details:
        'SES treten bei Kindern auf der ganzen Welt und in jedem sozialen Milieu auf.',
    },

    {
      question:
        'Die Ursache für eine SES ist unklar, aber es treten familiäre Häufungen auf.',
      answer: true,
      details:
        'Trotz der hohen Anzahl Betroffener ist die genaue Ursache von SES nach wie vor unklar. Eine SES kann durch genetische Faktoren beeinflusst werden und familiär gehäuft auftreten.',
    },

    {
      question: 'Erwachsene können nicht von einer SES betroffen sein.',
      answer: false,
      details:
        'Auch wenn eine SES nicht sichtbar ist, kann sie ein Leben lang bestehen bleiben, wenn sie nicht erkannt und nicht behandelt wird.',
    },
  ];
  var answers = [];
  var didClickFinish = false;

  var questions = $('.questions');

  for (let i = 0; i < theQuestions.length; i++) {
    questions.append(
      '<div class="question" id="' +
        i +
        '">' +
        '<h3>' +
        '<span class="question__number">#' +
        (i + 1) +
        ' </span>' +
        theQuestions[i].question +
        '</h3>' +
        '<div class="question__label-group">' +
        '<label class="switch">' +
        ' <input class="choice" type="radio" data-choice="true" name="' +
        i +
        '" />' +
        ' <span class="slider"></span>' +
        '<span class="visually-hidden">Richtig</span>' +
        '</label>' +
        '<span>Richtig</span>' +
        '</div>' +
        '<div class="question__label-group">' +
        '<label class="switch">' +
        ' <input class="choice" type="radio" data-choice="false" name="' +
        i +
        '"/>' +
        '<span class="slider"></span>' +
        '<span class="visually-hidden">Falsch</span>' +
        ' </label>' +
        '  <span>Falsch</span>' +
        '</div>'
    );
  }

  for (let i = 0; i < theQuestions.length; i++) {
    answers.push(false);

    $("input[type='radio'][name='" + i + "']").click(function () {
      updateAnswer($(this).attr('name'), $(this).attr('data-choice'));
    });
  }

  function updateAnswer(questionNumber, answer) {
    answers[questionNumber] = answer === 'true' ? true : false;
    theQuestions[questionNumber].didAnswer = true;
  }

  function showResults() {
    if (!didClickFinish) {
      var correctAnswers = 0;

      var wrongStyles = {
        border: '4px solid red',
        background: ' rgba(128,0,0,.1)',
      };

      var correctStyles = {
        border: '4px solid green',
        background: 'rgba(0,128,0,.1)',
      };

      for (let i = 0; i < theQuestions.length; i++) {
        var question = $('#' + i + '');
        if (
          theQuestions[i].didAnswer &&
          answers[i] !== theQuestions[i].answer
        ) {
          if (theQuestions[i].answer) {
            $($('#' + i + '>.question__label-group')[1]).css(wrongStyles);
          } else {
            $($('#' + i + '>.question__label-group')[0]).css(wrongStyles);
          }
          question.append(
            '<p class="question__details">' + theQuestions[i].details + '</p>'
          );
        } else if (!theQuestions[i].didAnswer) {
          question.append(
            '<p class="question__details">' + theQuestions[i].details + '</p>'
          );
        } else {
          if (theQuestions[i].answer) {
            $($('#' + i + '>.question__label-group')[0]).css(correctStyles);
          } else {
            $($('#' + i + '>.question__label-group')[1]).css(correctStyles);
          }
          correctAnswers++;
        }
      }
      var score =
        '<h3>Sie haben ' +
        correctAnswers +
        '/' +
        theQuestions.length +
        ' Fragen richtig beantwortet</h3>';
      var scoreBoard =
        '<div id="scoreboard" class="scoreboard">' + score + '</div>';
      questions.prepend(scoreBoard);
    }
  }

  function disableChoices() {
    $('.choice').attr('disabled', true);
  }

  questions.append('<button class="btn" id="done-button">Fertig</button>');

  $('#done-button').on('click', function () {
    disableChoices();
    showResults();

    var scoreBoard = $('#scoreboard');
    var score = document.getElementById('scoreboard');
    console.log(score.getBoundingClientRect())
    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate(
      {
        scrollTop: scoreBoard.offset().top - 50,
      },
      800
    );
    didClickFinish = true;
  });
});
