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
        question: 'Test question 2?',
        choice1: "5",
        choice2: "6",
        choice3: "7",
        choice4: "8",
        answer: 6,
    }
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
}

choices.forEach(choice => {
    console.log("HERE")
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false

        const selectedChoice = e.target
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