const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function geefEensAntwoord()
{
    let audio = new Audio('media/Geef eens antwoord.mp3');
    audio.play() 
}

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
  setTimeout(geefEensAntwoord, 5000)
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
    
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
    {
        question: 'In welk park staat de Watertoren??',
        answers: [
          { text: 'Oranjepark', correct: true },
          { text: 'Beatrixpark', correct: false },
          { text: 'Julianapark', correct: false },
          { text: 'Broekpolder', correct: false }
        ]
      },

  {
    question: 'Wie was de ontwerper van de Watertoren Vlaardingen??',
    answers: [
      { text: 'P.J. van Hartskamp-de Jong', correct: true },
      { text: 'R. Bovenberg', correct: false },
      { text: 'W. Kerkhof', correct: false },
      { text: 'J.H.J. Kording', correct: false }
    ]
  },
  {
    question: 'BONUS vraag! Hoeveel geld wilde Jos van Bob de huisbaas lenen?',
    answers: [
      { text: '10 euros', correct: false },
      { text: '50 euros', correct: true },
      { text: '2 eurotjes 50', correct: true },
      { text: '5 euros', correct: true }
    ]
  }
]