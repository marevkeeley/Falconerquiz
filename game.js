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
        question: 'A potential sponsor requires the following before he or she will agree to shepherd an apprentice into the sport:',
        choice1: "payment for his/her tutelage from the apprentice.",
        choice2: "specific evidence of a sincere commitment on the part of the potential apprentice to undertake all aspects of learning about the sport.",
        choice3: "a note from the potential apprentice’s spouse or parent that it’s okay with him/her if the aspirant undertakes the sport.",
        choice4: "attendance at all VFA events, and help with cleaning the sponsor’s raptor facilities.",
        answer: "specific evidence of a sincere commitment on the part of the potential apprentice to undertake all aspects of learning about the sport.",
    },
    {
        question: 'Not all land is suited to flying a bird of prey, no matter how much prey might be found there. Which of the following would make an ethical, safe falconer consider NOT flying a bird?',
        choice1: "Property where the best prey habitat runs along a busy road.",
        choice2: "An enormous tract of land with plenty of habitat, but where the falconer does not have permission.",
        choice3: "A semi-suburban area or industrial park property where a cat is visible, prowling the brush.",
        choice4: "All of the above.",
        answer: "All of the above.",
    },
    {
        question: 'It’s perfectly all right to use raptors permitted under a falconry license for personal gain. Many falconers allow their birds to make paid appearances in films and commer- cials to help support their falconry.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: "False",
    },
    {
        question: 'The two most important characteristics of a personality capable of becoming a good falconer are',
        choice1: "curiosity and a mindset that includes lifelong learning.",
        choice2: "stubbornness and a tendency to judge others.",
        choice3: "patience and persistence.",
        choice4: "a and c only.",
        answer: "a and c only.",
    },
    {
        question: 'The definition of falconry is',
        choice1: "the pursuit of wild game in its natural habitat by means of a trained bird of prey.",
        choice2: "holding a bird on the glove and attending renaissance fairs.",
        choice3: "using a better-than-average knowledge of raptor biology to rehabilitate birds of prey so they can return to the wild.",
        choice4: "doing educational presentations surrounding birds of prey, their habitats, conservation, biology, and natural history for groups from scouts to bird watchers.",
        answer: "the pursuit of wild game in its natural habitat by means of a trained bird of prey.",
    },
    {
        question: 'The methods used for training a bird of prey are just like those used in training a hunting dog or a hunter/jumper horse.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: "False",
    },
    {
        question: 'Which of the following is the best approach to the various pieces and styles/types of equipment used in falconry?',
        choice1: "Make everything you will use in falconry, from facilities to gauntlets; from hoods to swivels.",
        choice2: "Caring for and maintaining the equipment you cannot make yourself.",
        choice3: "Annually replacing any equipment that is attached to the bird for safety’s sake.",
        choice4: "b and c above.",
        answer: "b and c above.",
    },
    {
        question: 'Falconry permits in the United States are regulated, administered, and enforced by each state or territory’s game department. All of these agencies have different names, and to find your state’s department, search for the group that manages hunting licens- es. In the Commonwealth of Virginia, our regulating agency is which of the following?',
        choice1: "The federal Fish and Wildlife Service.",
        choice2: "The Virginia Army Reserves.",
        choice3: "Officials at the university nearest where you live.",
        choice4: "The Department of Wildlife Resources.",
        answer: "The Department of Wildlife Resources.",
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
}



incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()