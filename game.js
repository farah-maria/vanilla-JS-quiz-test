const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question:'What is 2 + 2?',
        choice1: '2',
        choice2:'4',
        choice3:'21',
        choice4:'17',
        answer: 2,
    },
    {
        question: 'What is 2 + 1?',
        choice1: '7',
        choice2:'18',
        choice3: '90',
        choice4: '3',
        answer: 3,
    },
    {
        question: 'What is 7 + 6?',
        choice1: '23',
        choice2: '12',
        choice3: '14',
        choice4: '13',       
        answer: 13,
    },
    {
        question: 'What is 9 + 10?',
        choice1: '3',
        choice2:'37',
        choice3:'19',
        choice4:'27',
        /* strings should have double quotes, when you're putting them in */
        answer: 19,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 4;
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEasch(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parent.classList.remove(classToApply);
            getNewQuestion();
        
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score;
}

startGame();
