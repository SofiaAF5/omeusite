document.addEventListener('DOMContentLoaded', function () {
  const questions = [
    {
      question: 'O que mais gostas de fazer no teu tempo livre?',
      options: ['Passear na natureza', 'Ir a espaços de cultura'],
    },
    {
      question: 'És mais introvertido ou extrovertido?',
      options: ['Introvertido', 'Extrovertido'],
    },
    {
      question: 'O que gostas mais numa viagem?',
      options: ['Conhecer a cultura local', 'Comida', 'Conhecer pessoas novas', 'A aventura de explorar novos sítios'],
    },
    {
      question: 'Preferes clima frio ou quente?',
      options: ['Frio', 'Quente'],
    },
    {
      question: 'Preferes viajar sozinho ou acompanhado?',
      options: ['Sozinho', 'Acompanhado'],
    },
    {
      question: 'Gostas de desportos radicais?',
      options: ['Sim', 'Não'],
    },
  ];

  const results = {
    'Passear na natureza': [
      'Visita Guiada à Ilha da Queimada Grande - ilha das cobras',
      'Viagem subterrânea com estadia na estação de Yoshioka-kaitei',
      'Pernoita nos montes Sikhote Alin - Sibéria',
    ],
    'Ir a espaços de cultura': [
      'Visita guiada à área 51',
      'Passeio Paralelo 38',
      'Largada nas Ruínas do forte Taudeni'
    ],
    'Introvertido': [
      'Pernoita nos montes Sikhote Alin - Sibéria',
      'Viagem subterrânea com estadia na estação de Yoshioka-kaitei'
    ],
    'Extrovertido': [
      'Visita guiada à área 51',
      'Passeio Paralelo 38',
      'Largada nas Ruínas do forte Taudeni'
    ],
    'Conhecer a cultura local': 'Largada nas Ruínas do forte Taudeni',
    'Comida': ['Visita Guiada à Ilha da Queimada Grande - ilha das cobras'],
    'Conhecer pessoas novas': [
      'Visita guiada à área 51',
      'Passeio Paralelo 38'
    ],
    'A aventura de explorar novos sítios': [
      'Pernoita nos montes Sikhote Alin - Sibéria',
      'Viagem subterrânea com estadia na estação de Yoshioka-kaitei'
    ],
    'Frio': [
      'Passeio Paralelo 38',
      'Pernoita nos montes Sikhote Alin - Sibéria',
      'Viagem subterrânea com estadia na estação de Yoshioka-kaitei'
    ],
    'Quente': [
      'Visita guiada à área 51',
      'Largada nas Ruínas do forte Taudeni'
    ],
    'Sozinho': [
      'Largada nas Ruínas do forte Taudeni',
      'Pernoita nos montes Sikhote Alin - Sibéria',
      'Viagem subterrânea com estadia na estação de Yoshioka-kaitei'
    ],
    'Acompanhado': [
      'Visita guiada à área 51',
      'Passeio Paralelo 38'
    ],
    'Sim': [
      'Pernoita nos montes Sikhote Alin - Sibéria',
      'Largada nas Ruínas do forte Taudeni'
    ],
    'Não': [
      'Passeio Paralelo 38',
      'Visita guiada à área 51',
      'Viagem subterrânea com estadia na estação de Yoshioka-kaitei'
    ],
  };

  let currentQuestion = 0;
  let userAnswers = [];

  const questionContainer = document.getElementById('question-container');
  const optionsContainer = document.getElementById('options-container');
  const resultContainer = document.getElementById('result-container');
  const saibaMaisBtn = document.getElementById('saibaMaisBtn'); 
  const restartBtn = document.getElementById('restart-btn');
  
  restartBtn.style.display = 'none';
  saibaMaisBtn.style.display = 'none';

  function loadQuestion() {
    const currentQuizQuestion = questions[currentQuestion];
    questionContainer.textContent = currentQuizQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuizQuestion.options.forEach((option) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', checkAnswer);
      optionsContainer.appendChild(button);
    });
  }

  function checkAnswer(event) {
    const selectedOption = event.target;
    userAnswers.push(selectedOption.textContent);

    // Adiciona uma classe de destaque temporário
    selectedOption.classList.add('selected-option');

    // Remove a classe de destaque após 1 segundo (1000 milissegundos)
    setTimeout(() => {
      selectedOption.classList.remove('selected-option');
      currentQuestion++;

      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
        saibaMaisBtn.style.display = 'inline-block'
        restartBtn.style.display = 'inline-block';
      }
    }, 1000);
  }

  function showResult() {
    let resultText = '';

  
    if (userAnswers.includes('Comida')) {
      resultText = results['Comida'];
    } else {
   
      const resultKey = userAnswers.join('_');
      if (!results[resultKey]) {
        const closestMatch = findClosestMatch(resultKey);
        resultText = results[closestMatch];
      } else {
        resultText = results[resultKey];
      }

      if (Array.isArray(resultText)) {
        const randomIndex = Math.floor(Math.random() * resultText.length);
        resultText = resultText[randomIndex];
      }
    }




    document.getElementById('result-text').textContent = resultText || 'Resultado não encontrado';
    document.getElementById('quiz-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    document.getElementById('restart-btn').classList.remove('hidden');
  }

  function findClosestMatch(key) {
    let closestMatch = '';
    let closestDistance = Infinity;

    for (const resultKey in results) {
      const distance = levenshteinDistance(key, resultKey);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestMatch = resultKey;
      }
    }

    return closestMatch;
  }

  function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // Inicializa a matriz
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // Preenche a matriz
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        const cost = a[j - 1] === b[i - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[b.length][a.length];
  }

  function resetQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    document.getElementById('quiz-container').classList.remove('hidden');
    resultContainer.classList.add('hidden');
    loadQuestion();
  }

  document.getElementById('restart-btn').addEventListener('click', resetQuiz);

  loadQuestion();
});


