const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

let goedeAntwoordenAudio = [
  "Dat is wel mooi natuurlijk.mp3",
  "Gha ha ha ha.mp3",
  "Nou weet je wat werken is.mp3",
  "Je moet gewoon kijken, hoe de baas het doet hééé.mp3",
  "Ja, Ja, Ja, wel waar Jos.mp3",
    "Can You Hear Me.mp3",
  "U ken doorgaan.mp3",
  "We zijn net de soos, kinderen van de soos.mp3",
  "Denkt erom hoor, dat ik er 1 ben.mp3"

];
let fouteAntwoordenAudio = [
  "Allemaal Loze Putten.mp3",
  "Allemaal Vuilniszakken.mp3",
  "Als Je Nou Je Herses Gebruik.mp3",
  "Als Je Nou Opgepas Had.mp3",
  "Normaal doen hoor.mp3",
  "Optieffuhh, gauw!.mp3",
  "We hebben geen tyfus aan die zwerver joh.mp3",
  "Je heb altijd een grote muil gehad.mp3",
  "Kijk, je moet je eigen anpassen.mp3",
  "Dááágg.mp3"
];

let correctQuestions = 0

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function geefEensAntwoord() {
  let audio = new Audio("media/Geef eens antwoord.mp3");
  audio.play();
}

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  correctQuestions = 0
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
  //   setTimeout(geefEensAntwoord, 10000);
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  console.log(e.target.innerText)
  const correct = selectedButton.dataset.correct;
  if (correct) {
      if(e.target.innerText === "5 euros"){
        let audio = new Audio("media/5 Euro's.. Op Je Muil, Gauw!.mp3");
        audio.play();
      } else {
    randomGeluid =
      goedeAntwoordenAudio[
        Math.floor(Math.random() * goedeAntwoordenAudio.length)
      ];
    let audio = new Audio(`media/${randomGeluid}`);
    audio.play();
    goedeAntwoordenAudio = goedeAntwoordenAudio.filter(
      (x) => x !== randomGeluid
    );}
    correctQuestions++

  } else {
    randomGeluid =
      fouteAntwoordenAudio[
        Math.floor(Math.random() * goedeAntwoordenAudio.length)
      ];
    let audio = new Audio(`media/${randomGeluid}`);
    audio.play();
    fouteAntwoordenAudio = fouteAntwoordenAudio.filter(
      (x) => x !== randomGeluid
    );
  }

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
      if(correctQuestions === 10) {
        startButton.innerText = "Gefeliciteerd! u heeft alle vragen goed beantwoord";
        startButton.classList.remove("hide");
      }
    startButton.innerText = "Opnieuw beginnen";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "In welk park staat de Watertoren??",
    answers: [
      { text: "Oranjepark", correct: true },
      { text: "Beatrixpark", correct: false },
      { text: "Julianapark", correct: false },
      { text: "Broekpolder", correct: false },
    ],
  },

  {
    question: "Wie was de ontwerper van de Watertoren Vlaardingen??",
    answers: [
      { text: "P.J. van Hartskamp-de Jong", correct: false },
      { text: "R. Bovenberg", correct: false },
      { text: "W. Kerkhof", correct: false },
      { text: "J.H.J. Kording", correct: true },
    ],
  },
  {
    question: "BONUS vraag! Hoeveel geld wilde Jos van Bob de huisbaas lenen?",
    answers: [
      { text: "10 euros", correct: false },
      { text: "50 euros", correct: false },
      { text: "2 eurotjes 50", correct: false },
      { text: "5 euros", correct: true },
    ],
  },
  {
    question:
      "Hoeveel watertorens zijn er geweest voor de huidige watertoren??",
    answers: [
      { text: "0 dit is de eerste", correct: false },
      { text: "1", correct: false },
      { text: "2", correct: true },
      { text: "3", correct: false },
    ],
  },
  {
    question: "Hoe hoog is de watertoren?",
    answers: [
      { text: "39 meter", correct: true },
      { text: "35 meter", correct: false },
      { text: "40 meter", correct: false },
      { text: "37.5 meter", correct: false },
    ],
  },
  {
    question:
      "Hoeveel waterreservoirs heeft de watertoren en hoe groot zijn deze?",
    answers: [
      { text: "1 en 1100 m3", correct: false },
      { text: "2 en 600 m3", correct: false },
      { text: "2 en 500 m3", correct: false },
      { text: "2 en 550 m3", correct: true },
    ],
  },
  {
    question: "Hoeveel verdiepingen zijn er in de watertoren?",
    answers: [
      { text: "4", correct: false },
      { text: "5", correct: false },
      { text: "6", correct: true },
      { text: "7", correct: false },
    ],
  },
  {
    question: "Welke steden kan je zien liggen vanaf de top van de watertoren?",
    answers: [
      { text: "Den Haag en Rotterdam", correct: false },
      { text: "Den Haag, Delft en Rotterdam", correct: true },
      { text: "Delft en Rotterdam", correct: false },
      { text: "Den Haag en Delft", correct: false },
    ],
  },
  {
    question: "Wie is de penningmeester van de stichting: De vrienden van de watertoren?",
    answers: [
      { text: "Niemand", correct: false },
      { text: "Jerome", correct: false },
      { text: "Tim Santema", correct: true },
      { text: "Bob de huisbaas", correct: false },
    ],
  },
  {
    question: "Wat is eigenlijk de functie van een watertoren??",
    answers: [
      { text: "Druk creeeren", correct: true },
      { text: "Puur en enkel alleen wateropslag", correct: false },
      { text: "Water beschermen tegen bevriezing", correct: false },
      { text: "Reiniging van het water", correct: false },
    ],
  },

];
