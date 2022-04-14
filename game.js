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
    {
        question: 'Any Virginia resident who applies for a falconry permit can substitute a minimum of 4 months and a maximum of 1 year of education from a certified falconry school and/or volunteer work at a raptor rehabilitation center for a portion of his or her 2-year appren- ticeship in the sport of falconry.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 2,
    },
    {
        question: 'In addition to the equipment that will be attached directly to the bird, the inspection checklist includes several other pieces of equipment. A bath pan, however, is not nec- essary because',
        choice1: "birds of prey don’t like to bathe.",
        choice2: "raptors don’t drink much because they get all the hydration they need from eating fresh meat.",
        choice3: "a full bath pan could cause illness in a bird.",
        choice4: "none of the above.",
        answer: 4,
    },
    {
        question: 'Which factor is most important in determining which raptor any falconer should fly?',
        choice1: "Legal status of the falconer.",
        choice2: "Proximity to other falconers flying similar species.",
        choice3: "Availability of prey suitable for that raptor.",
        choice4: "Appropriateness of raptor housing.",
        answer: 3,
    },
    {
        question: 'Apprentice falconers are not allowed to take eyass birds for use in falconry.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 1,
    },
    {
        question: 'Traveling with your bird is often a key element of the sport. Even if you have your own acreage, you don’t want to “overhunt” the population of game species on your own grounds. So falconers most often have permissions at several friends’ and neigh- bors’ properties where they carry their birds to fly on game. To practice falconry on other properties where they have permission to hunt, many falconers use a giant hood, which is. ',
        choice1: "a transport box built to fit the size and perch needs of a trained raptor.",
        choice2: "a large leather hood primarily used for big raptors such as eagles.",
        choice3: "good to keep a hood-shy raptor calm.",
        choice4: "a and c are correct",
        answer: 4,
    },
    {
        question: 'Because this all-important piece of equipment is so critical, it is important that you use the best possible style of swivel. The best swivel to have in a leash/jess system is',
        choice1: "a French clip.",
        choice2: "one with a strong ball bearing “works.”",
        choice3: "any snap-type will do.",
        choice4: "all of the above.",
        answer: 2,
    },
    {
        question: 'All leash/jess systems have a swivel involved. Even if your housing is not designed to use a tethering option, there will be times that you tie your bird’s leash to a bow or ring perch, into its giant hood, or via another arrangement. The swivel is essential for which of the following reasons?',
        choice1: "So the bird will not fly away.",
        choice2: "So your bird will not twist its jesses and tangle its feet and legs in a knot.",
        choice3: "So it won’t be attacked by a wild raptor.",
        choice4: "So it will remain calm and stress-free.",
        answer: 2,
    },
    {
        question: 'Your sponsor will guide your choice of which type of leash/jess system you will adopt. Many experienced falconers make their own equipment and your sponsor might require you to do so as well. The leash a falconer uses in the sport may be',
        choice1: "made of well-oiled, strong leather.",
        choice2: "made of strong-yet-supple nylon.",
        choice3: "be directly attached to the tarsus.",
        choice4: "a and b are correct.",
        answer: 4,
    },
    {
        question: 'If we break the laws or ignore the regulations surrounding falconry set by our reg- ulating agency, and we are caught doing so, the Law Enforcement arm of that agency has the authority to revoke permits and confiscate birds. Which agency regulates and monitors the sport of falconry in the United States, and is responsible for suspension or revocation of permits to practice falconry?',
        choice1: "The federal Fish and Wildlife Service (FWS).",
        choice2: "The agency authorized by the state, tribal, or territorial government where the applicant/permittee resides.",
        choice3: "The department of motor vehicles (DMV) in the state where the applicant/permittee resides.",
        choice4: "None of the above.",
        answer: 2,
    },
    {
        question: 'If an apprentice falconer moves to another state in the middle of his/her appren- ticeship and keeps the permit from the state he/she left while applying for a second permit in the new residence, then the apprentice can have any number of falconry permits, and can possess the number of raptors allowed by each permit.',
        choice1: "True",
        choice2: "False",
        choice3: "",
        choice4: "",
        answer: 2,
    },
    {
        question: 'Due to their size and overall biology and habitat, Cooper’s hawks are best suited for hunting',
        choice1: "jackrabbits.",
        choice2: "quail.",
        choice3: "ducks.",
        choice4: "pheasant.",
        answer: 2,
    },
    {
        question: 'Tiercel sharp-shinned hawks have all the skills needed for hunting',
        choice1: "rabbits.",
        choice2: "ducks.",
        choice3: "English sparrows.",
        choice4: "quail.",
        answer: 3,
    },
    {
        question: 'In the Western US, there’s a buteo that feeds primarily on ground quarries (like black-tailed jackrabbits) called the ferruginous hawk. Having read a little about ferrugs, you know that they',
        choice1: "won’t defend the nest because it’s near the ground.",
        choice2: "are parabuteos.",
        choice3: "tend to be larger than a red-tailed hawk.",
        choice4: "b and c above.",
        answer: 3,
    },
    {
        question: 'A kestrel’s ideal hunt-able quarry in Virginia is',
        choice1: "quail.",
        choice2: "starlings.",
        choice3: "English sparrows.",
        choice4: " b and c above.",
        answer: 4,
    },
    {
        question: 'In the US, goshawks, Cooper’s hawks, and sharp-shinned hawks (accipiters) are also called',
        choice1: "broad wings.",
        choice2: "long wings.",
        choice3: "short wings.",
        choice4: "all of the above.",
        answer: 3,
    },
    {
        question: 'In general, the male birds of prey',
        choice1: "are first to return from migration.",
        choice2: "select the nesting/egg-laying area.",
        choice3: "provide most of the food after the young have hatched.",
        choice4: "all of the above.",
        answer: 4,
    },
    {
        question: 'After a strenuous fight with a squirrel during hunting, you discover that your RTH has bent a tail feather. What should you do about this?',
        choice1: "Cut it off at the bend and imp a new feather in its place.",
        choice2: "Call your sponsor and ask for advice.",
        choice3: "Soak the feather in leather softening oil.",
        choice4: "Pluck the feather from the bird’s body so it will grow back during the summer.",
        answer: 2,
    },
    {
        question: 'As you administer feather mite spray to your newly-trapped bird, you notice visible lines along the shafts of the wing feathers, all about the same spot on several prima- ries. These marks might be “fret marks” and indicate which of the following:',
        choice1: "arrested feather development.",
        choice2: "stress.",
        choice3: "both a and b.",
        choice4: "none of the above.",
        answer: 3,
    },
    {
        question: 'Any passage hawk in captivity is most likely to break tail feathers',
        choice1: " if the falconer uses a tail saver on his/her bird.",
        choice2: "if the bird normally crashes into brush to catch rabbits.",
        choice3: "if it is housed improperly or kept on a perch wrong for its speci",
        choice4: "when it is allowed to warble.",
        answer: 3,
    },
    {
        question: 'Knowing the stages of a raptor’s life are important identification techniques, and the terminology used for thousands of years in falconry is helpful in designating those stages. Which of the statements below is/are true:',
        choice1: "A haggard hawk was once an eyass.",
        choice2: "An eyass hawk was once a haggard.",
        choice3: "A passage bird was once an eyass.",
        choice4: "a and c above are true.",
        answer: 4,
    },
    {
        question: 'Which of the birds of prey listed is most likely to travel the longest distance during its migratory period?',
        choice1: "Merlin.",
        choice2: "Prairie falcon.",
        choice3: "Goshawk.",
        choice4: "Gyrfalcon.",
        answer: 1,
    },
    {
        question: 'In general, a bird of prey will have reached full size by the time it is',
        choice1: "1 year old.",
        choice2: "fledging from the nest.",
        choice3: "about breeding age, around 2-3 years old.",
        choice4: "halfway through its first year.",
        answer: 2,
    },
    {
        question: 'Which among the following list of birds of prey is the LEAST likely to raise its young on a cliff or rock ledge?',
        choice1: "Jerkin.",
        choice2: "Golden eagle.",
        choice3: "Prairie falcon.",
        choice4: "Jack",
        answer: 4,
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 1,
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 1,
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 1,
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 1,
    },
    {
        question: '',
        choice1: "",
        choice2: "",
        choice3: "",
        choice4: "",
        answer: 1,
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
    if(availableQuestions.length === 0 || questionCounter === MAX_QUESTIONS) {
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