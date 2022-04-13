const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-text'))
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
        answer: 2,
    },
    {
        question: 'You must have facilities for the raptor you will fly in the sport of falconry inspected and approved by the VDWR before you get your apprentice permit.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 1,
    },
    {
        question: 'The federal government has done studies that indicate:',
        choice1: "the best bird for an apprentice falconer to have is a Cooper’s hawk.",
        choice2: "apprentices do fine in the sport of falconry, even if they do not have a sponsor.",
        choice3: "the sport of falconry has no impact on the wild raptor populations in the US.",
        choice4: "the best beginning falconers have come from a hunting lifestyle.",
        answer: 3,
    },
    {
        question: 'A potential sponsor requires the following before he or she will agree to shepherd an apprentice into the sport:',
        choice1: "payment for his/her tutelage from the apprentice.",
        choice2: "specific evidence of a sincere commitment on the part of the potential apprentice to undertake all aspects of learning about the sport.",
        choice3: "a note from the potential apprentice’s spouse or parent that it’s okay with him/her if the aspirant undertakes the sport.",
        choice4: "attendance at all VFA events, and help with cleaning the sponsor’s raptor facilities.",
        answer: 2,
    },
    {
        question: 'Not all land is suited to flying a bird of prey, no matter how much prey might be found there. Which of the following would make an ethical, safe falconer consider NOT flying a bird?',
        choice1: "Property where the best prey habitat runs along a busy road.",
        choice2: "An enormous tract of land with plenty of habitat, but where the falconer does not have permission.",
        choice3: "A semi-suburban area or industrial park property where a cat is visible, prowling the brush.",
        choice4: "All of the above.",
        answer: 4,
    },
    {
        question: 'It’s perfectly all right to use raptors permitted under a falconry license for personal gain. Many falconers allow their birds to make paid appearances in films and commer- cials to help support their falconry.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 2,
    },
    {
        question: 'The two most important characteristics of a personality capable of becoming a good falconer are',
        choice1: "curiosity and a mindset that includes lifelong learning.",
        choice2: "stubbornness and a tendency to judge others.",
        choice3: "patience and persistence.",
        choice4: "a and c only.",
        answer: 4,
    },
    {
        question: 'The definition of falconry is',
        choice1: "the pursuit of wild game in its natural habitat by means of a trained bird of prey.",
        choice2: "holding a bird on the glove and attending renaissance fairs.",
        choice3: "using a better-than-average knowledge of raptor biology to rehabilitate birds of prey so they can return to the wild.",
        choice4: "doing educational presentations surrounding birds of prey, their habitats, conservation, biology, and natural history for groups from scouts to bird watchers.",
        answer: 1,
    },
    {
        question: 'The methods used for training a bird of prey are just like those used in training a hunting dog or a hunter/jumper horse.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 2,
    },
    {
        question: 'Which of the following is the best approach to the various pieces and styles/types of equipment used in falconry?',
        choice1: "Make everything you will use in falconry, from facilities to gauntlets; from hoods to swivels.",
        choice2: "Caring for and maintaining the equipment you cannot make yourself.",
        choice3: "Annually replacing any equipment that is attached to the bird for safety’s sake.",
        choice4: "b and c above.",
        answer: 4,
    },
    {
        question: 'Falconry permits in the United States are regulated, administered, and enforced by each state or territory’s game department. All of these agencies have different names, and to find your state’s department, search for the group that manages hunting licens- es. In the Commonwealth of Virginia, our regulating agency is which of the following?',
        choice1: "The federal Fish and Wildlife Service.",
        choice2: "The Virginia Army Reserves.",
        choice3: "Officials at the university nearest where you live.",
        choice4: "The Department of Wildlife Resources.",
        answer: 4,
    },
    {
        question: 'The falconry exam consists of 105 questions in several categories of study. While it is not necessary to know arcane terminology or the titles of ancient texts, it is good to focus your study in the areas of concentration in the test. Among these categories are which of the following?',
        choice1: "Definitions and regulations.",
        choice2: "Biology and habitat of prey species.",
        choice3: "Training and hunting.",
        choice4: "a and c only.",
        answer: 4,
    },
    {
        question: 'To pass the exam, you must know the scientific names of species.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 2,
    },
    {
        question: 'Among the most important aspects of becoming a falconer is to build and have inspected the housing where your raptor will live. Housing must be safe for the bird in terms of perching materials and tethering systems (where chosen). Privacy for the bird is important, as well as air flow for summer cooling, yet wind protection for winter warmth. To pass inspection, a mew must',
        choice1: "have a secure door easily closed.",
        choice2: "have a floor that pools with water.",
        choice3: "be difficult to access, because that assures raptor safety",
        choice4: "assure no predators or neighborhood children can get inside, thus cannot have any windows.",
        answer: 1,
    },
    {
        question: 'The nongame biologist assigned to your region will come and administer the test at the same time he/she inspects your housing and equipment. Among the items of equipment required to be presented at the time of inspection, you will need the following:',
        choice1: "sturdy hunting boots.",
        choice2: "a beating stick for flushing game.",
        choice3: "all of the above.",
        choice4: "none of the above.",
        answer: 4,
    },
    {
        question: 'There is much tradition surrounding the sport of falconry, and many pieces of tradi- tional equipment as well as the ways of making them have endured through centuries. A good example is a piece of leather we call a “bewit,” an item of equipment used for attaching:',
        choice1: "bells around the neck",
        choice2: "bells or transmitters to the legs.",
        choice3: "jesses to the bird’s tarsi",
        choice4: "a swivel to the jesses.",
        answer: 2,
    },
    {
        question: 'There are many items that will be required before you get your first bird. Which of the following is NOT required for a newly-trapped raptor?',
        choice1: "A glove.",
        choice2: "A swivel",
        choice3: "A transmitter.",
        choice4: "A leash",
        answer: 3,
    },
    {
        question: 'Before entering the sport, it is good to have a working knowledge of the rules, laws, ethics, and regulations governing falconry. Having a copy of the falconry regulations adopted by your state is an essential piece of reference material. For example, each level of permittee in falconry offers different privileges. Having learned these permittee levels, you know that apprentice falconers are allowed to have an imprinted bird only',
        choice1: "if it is a red-tailed hawk.",
        choice2: "with your sponsor’s approval and permission",
        choice3: "if it is given to you by a rehabilitator.",
        choice4: "none of the above",
        answer: 4,
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
        return window.location.assign('https://marevkeeley.github.io/Falconerquiz/end.html')
    }
    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>  {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    currentAnswer = currentQuestion.answer
    availableQuestions.splice(questionIndex, 1)
    acceptingAnswers = true
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