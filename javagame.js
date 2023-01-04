const question = document.getElementById("question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const p1 = document.getElementById("p1");
const home = document.getElementById("home");
/* cSpell:disable */
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Will you … me ?",
    choice1: "All True",
    choice2: "Marry",
    choice3: "Marrying",
    choice4: "Married",
    answer: 2,
  },
  {
    question: "She will … loved.",
    choice1: "Be",
    choice2: "Had",
    choice3: "Has",
    choice4: "is",
    answer: 1,
  },
  {
    question: "What … I learn in Civil Engineering?",
    choice1: "Are",
    choice2: "Am going to",
    choice3: "Would",
    choice4: "Will",
    answer: 4,
  },
  {
    question: "Your teacher … proud if you win in the contest.",
    choice1: "Will",
    choice2: "Will be",
    choice3: "be",
    choice4: "is",
    answer: 2,
  },
  {
    question: "The thesis … written by me.",
    choice1: "Is",
    choice2: "Will",
    choice3: "Will be",
    choice4: "was",
    answer: 3,
  },
  {
    question: "what sentence does this include. 'I will not spend my holiday in Bali'",
    choice1: "Positif",
    choice2: "Negatif",
    choice3: "Interogatif",
    choice4: "Description",
    answer: 2,
  },
  {
    question: " … buy the extra foods in winter",
    choice1: "I will",
    choice2: "I’m going ",
    choice3: "I’m going to",
    choice4: "I go",
    answer: 3,
  },
  {
    question: "They won’t … to school soon.",
    choice1: "Be go",
    choice2: "Went",
    choice3: "Will be",
    choice4: "Go",
    answer: 4,
  },
  {
    question: "It is eight already, we … be late.",
    choice1: "Are going to",
    choice2: "Be going to",
    choice3: "Were going to",
    choice4: "I going to",
    answer: 1,
  },
  {
    question: " … we come together?",
    choice1: "What",
    choice2: "Are",
    choice3: "Shall",
    choice4: "was",
    answer: 3,
  },
  {
    question: "I expect, they … me this evening",
    choice1: "Will not phone",
    choice2: "will phone",
    choice3: "would phone",
    choice4: "are not phone",
    answer: 2,
  },
  {
    question: "Don’t touch this plate, IF you touch it, you … yourself.",
    choice1: "Will burn",
    choice2: "Will not burn",
    choice3: "Will be burn",
    choice4: "Will not be burn",
    answer: 1,
  },
  {
    question: "We … house next month.",
    choice1: "Will not make",
    choice2: "Will make",
    choice3: "Is making",
    choice4: "Would made",
    answer: 2,
  },
  {
    question: "Zaid … teacher next year. ",
    choice1: "Will ",
    choice2: "Would",
    choice3: "Will be",
    choice4: "Would’nt",
    answer: 3,
  },
  {
    question: "I have bought Zaid a present, Do you think He … it?",
    choice1: "Would like",
    choice2: "Will like",
    choice3: "Didn’t like",
    choice4: "Will not like",
    answer: 2,
  },
  {
    question: "Will you … me next month? ",
    choice1: "Visit",
    choice2: "Visited	",
    choice3: "Will visit",
    choice4: "Are visiting",
    answer: 1,
  },
  {
    question: "Ilzami and Annisa decided to have an event, They … an invitation.",
    choice1: "Are making",
    choice2: "Didn’t make	",
    choice3: "Will not to make",
    choice4: "Are going to make",
    answer: 4,
  },
  {
    question: "Don’t worry, this cat ,,, you.",
    choice1: "Are not hurting",
    choice2: "Is not hurting ",
    choice3: "Will hurting",
    choice4: "Is hurting",
    answer: 2,
  },
  {
    question: "Can’t you wait them, they … very long.",
    choice1: "Didn’t will",
    choice2: "Would",
    choice3: "Will be",
    choice4: "Will not be",
    answer: 4,
  },
  {
    question: "Hi Jane. Who … this bridge next month?",
    choice1: "Made this bridge",
    choice2: "Makes this bride",
    choice3: "Will make",
    choice4: "Would made",
    answer: 3,
  },
];

// perhitungan score

const SCORE_POINT = 5;
const MAX_QUESTIONS = 20;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("endgame.html");
  }

  questionCounter++;
  progressText.innerText = `Questions ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINT);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
startGame();
