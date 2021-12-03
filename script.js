const ezQuestions = {
  watch: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/watch--_gb_1.mp3',
  jeans: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/jeans--_gb_1.mp3',
  skirt: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/skirt--_gb_1.mp3',
  hour: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/hour--_gb_1.mp3',
  passport: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/passport--_gb_1.mp3',
  relax: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/relax--_gb_1.mp3',
  sweep: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/sweep--_gb_1.mp3',
  children: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/children--_gb_1.mp3',
  yard: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/yard--_gb_1.mp3',
  dress: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dress--_gb_1.mp3',
  design: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/design--_gb_1.mp3',
  adventure: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/adventure--_gb_1.mp3',
  ticket: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/ticket--_gb_1.mp3',
  dolphin: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/dolphin--_gb_1.mp3',
  autograph: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/autograph--_gb_1.mp3',
  persuaded: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/persuaded--_gb_1.mp3',
  appointment: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/appointment--_gb_1.mp3',
  question: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/question--_gb_1.mp3',
  language: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/language--_gb_1.mp3',
  burning: 'https://ssl.gstatic.com/dictionary/static/sounds/oxford/burning--_gb_1.mp3',
}

const ezHint = {
  watch: 'look at or observe attentively over a period of time.',
  jeans: 'hard-wearing trousers made of denim or other cotton fabric, for informal wear.',
  skirt: 'a garment fastened around the waist and hanging down around the legs, worn by women and girls.',
  hour: 'a period of time equal to a twenty-fourth part of a day and night and divided into 60 minutes.',
  passport: 'an official document issued by a government, certifying the holder\'s identity and citizenship.',
  relax: 'make or become less tense or anxious.',
  sweep: 'clean (an area) by brushing away dirt or litter.',
  children: 'a young human being below the age of puberty or below the legal age.',
  yard: 'a unit of linear measure equal to 3 feet',
  dress: 'decorate (something) in an artistic or attractive way.',
  design: 'a plan or drawing produced to show the look and function or workings.',
  adventure: 'an unusual and exciting, typically hazardous, experience or activity.',
  ticket: 'a certificate or warrant.',
  dolphin: 'a small gregarious toothed whale that typically has a beaklike snout and a curved fin on the back.',
  autograph: 'a signature, especially that of a celebrity written as a memento for an admirer.',
  persuaded: 'cause (someone) to do something through reasoning or argument.',
  appointment: 'an arrangement to meet someone at a particular time and place.',
  question: 'a sentence worded or expressed so as to elicit information.',
  language: 'a system of communication used by a particular country or community.',
  burning: 'very hot or bright.'
}

// Initializing element
const wrapper = document.getElementById('wrapper')
const main = document.getElementById('main')
const difficulty = document.getElementById('difficulty')
const audioSource = document.getElementById('audioSource')
const input = document.getElementById('answers')
const hintWrapper = document.getElementById('hintWrapper')
const hintBtn = document.getElementById('hint')
const hint = document.getElementById('showHint')
const scoreInfo = document.getElementById('scoreInfo')
let isLookAtHint = false

// init variable
const { values, keys } = Object
let audio
let currentQuestion = ''
let answers = ''
let diff = ''
let page = 1
let score = 0
const answered = []

// for the begining
wrapper.removeChild(main)

// For timer
let time = 5 // You can change the time here
let timeInMinutes = time * 60
let interval = null

/**
 * To start the timer
 */
const startTimer = () => {
  const timer = document.getElementById('timer')

  const minutes = Math.floor(timeInMinutes / 60)
  let seconds = timeInMinutes % 60

  timeInMinutes--
  timer.innerText = `${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`

  if (timeInMinutes < 0) {
    clearInterval(interval)
  }
}

/**
 * Handling easy button click
 */
const handleEasyBtn = () => {
  wrapper.removeChild(difficulty)
  wrapper.append(main)
  diff = 'easy'

  runQuiz()
  interval = setInterval(startTimer, 1000)
}

/**
 * Handling show hint
 */
const showHint = () => {
  isLookAtHint = true
  hintWrapper.removeChild(hintBtn)
  switch(diff) {
    case 'easy': hint.innerHTML = `<b>Hint:</b> ${ezHint[currentQuestion]}`
  }
}

/**
 * Running quiz
 */
const runQuiz = () => {
  const question = getDifficultyQuestion(diff)
  scoreInfo.innerText = `Your score: ${score}`
  switch(diff) {
    case 'easy': {
      currentQuestion = keys(ezQuestions)[question]
    }
  }
}

const random = () => {
  return Math.floor(Math.random() * keys(ezQuestions).length)
}
/**
 * Handling get question by difficulty
 * @returns {number}
 */
const getDifficultyQuestion = () => {
  let idx = random()

  // Filtering is the current question has passed yet
  const filterQuestion = answered.find(index => index === idx)
  if (page > 1 && filterQuestion !== undefined) {
    idx = random()
  }
  answered.push(idx)
  console.log(answered)

  switch(diff) {
    case 'easy': {
      audio = new Audio(values(ezQuestions)[idx])
    }
  }

  return idx
}

/**
 * Handle play audio
 */
const playAudio = () => {
  audio.play()
}

/**
 * To handle on change
 * @param {Event} e
 */
const handleChange = (e) => {
  answers = e.target.value
}

/**
 * Handling submit
 * @param {Event} e
 */
const handleSubmit = (e) => {
  e.preventDefault()
  if (page < 10) {
    if (answers.toLowerCase() === currentQuestion.toLowerCase()) {
      alert('Bener cuy')
      score += 10
    } else {
      alert('Salah bro')
    }

    input.value = ''

    if (isLookAtHint) { // If user took a look at hint
      hintWrapper.removeChild(hint)
      hintWrapper.append(hintBtn)
      isLookAtHint = false
    }

    page++
    runQuiz()
    console.log(page, `Hasil score: ${score}`)
  }
}