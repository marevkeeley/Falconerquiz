const question = document.querySelector('#question')
const choices = Array.from(document.querySelector('.choice-text'))
const progressText = document.querySelector('#progressText')
const scoreText = document.querySelector("#score")

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'A bird of prey in captivity requires what kind of diet?',
        choice1: "Cooked, well-seasoned, lean meat.",
        choice2: "A diet closely resembling that which it would be eating in the wild.",
        choice3: "A grain mix you can buy from the feed store, supplemented with fresh meat.",
        choice4: "Raptors are omnivores, so they eat all types of food to stay healthy.",
        answer: "A diet closely resembling that which it would be eating in the wild.",
    },
    {
        question: 'You must have facilities for the raptor you will fly in the sport of falconry inspected and approved by the VDWR before you get your apprentice permit.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: "True",
    },
    {
        question: 'The federal government has done studies that indicate:',
        choice1: "the best bird for an apprentice falconer to have is a Cooper’s hawk.",
        choice2: "apprentices do fine in the sport of falconry, even if they do not have a sponsor.",
        choice3: "the sport of falconry has no impact on the wild raptor populations in the US.",
        choice4: "the best beginning falconers have come from a hunting lifestyle.",
        answer: "the sport of falconry has no impact on the wild raptor populations in the US.",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: "",
    },
]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 20

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>  {
        choice.innerText = currentQuestion['choice']
    })

    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
    console.log("HERE")
}

choices.forEach(choice => {
    choice.addEventListener('click', (e) => {
        if(!acceptingAnswers) return
        acceptingAnswers = false

        const selectedChoice = e.currentTarget
        const selectedAnswer = selectedChoice.dataset['number']
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()