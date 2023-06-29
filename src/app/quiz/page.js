'use client'
import useSWR from 'swr'
import React, { useRef, useState } from 'react'
import styles from '@/app/Quiz.module.css'
import Loading from '@/components/Loading'
import Image from 'next/image'

const fetcher= async(url)=> {
  const response = await fetch(`${url}`);
  const {data} = await response.json();
  const totalQuestions=data.total;
  console.log("total questions : " + totalQuestions);
  if(totalQuestions>19 ){
    const randomPages = Math.round(Math.random() * (Math.floor(totalQuestions/20)-1) + 1);
    console.log(randomPages);
    const response = await fetch(`${url}&page=${randomPages}`);
    const {data} = await response.json();
    return data
  }
  console.log("current page : " + data.current_page);
  return data;
}

export default function Quiz() {
  const [showAlert, setShowAlert]= useState(false)
  const [alertText, setAlertText]= useState('')
  const [alertBg, setAlertBg]= useState('')
  const [mainLoading, setMainLoading]= useState(false)
  const [mainText, setMainText]= useState('')
  const [showQuiz, setShowQuiz]= useState(true)
  const [PrevScoreMobile, setPrevScoreMobile]= useState(false)
  const [showContent, setShowContent]= useState('difficulty')
  const [hint, setHint]= useState(null)
  const [score, setScore]= useState(0)
  const [timer, setTimer]= useState('05:00')
  const [visibleHint, setVisibleHint]= useState(true)
  const [isCorrect, setIsCorrect]= useState(false)
  const [isFinished, setIsFinished]= useState(false)
  // const [diff, setDiff]= useState(null)   
  let diff=null;
  const [currentQuestion, setCurrentQuestion]= useState(null)   
  const [level, setLevel]= useState(null)

  const uri= `${process.env.API_URL}?level=${level}`
  const { data, isLoading, error } = useSWR(level ? uri : null, fetcher)
  level?console.log('✅✅') :console.log('❌❌');;
  const runFetch=(lvl)=>{
    if(!data){
      setLevel(lvl)
      console.log(level, uri);
    }
  }
console.log(data,'✅');

// Initializing element
const ezScore = localStorage.getItem('ezScore') ? localStorage.getItem('ezScore') : '0'
const medScore = localStorage.getItem('medScore') ? localStorage.getItem('medScore') : '0'
const hardScore = localStorage.getItem('hardScore') ? localStorage.getItem('hardScore') : '0'

// init variable
const { values, keys } = Object
let audio
let page = 1
const answered = []



// For timer
let time = 5 // You can change the time here
let timeInMinutes = time * 60
let interval = null

/**
 * To start the timer
 */
const startTimer = () => {
  const minutes = Math.floor(timeInMinutes / 60)
  let seconds = timeInMinutes % 60

  timeInMinutes--
  setTimer(`${minutes < 10 ? '0'+minutes : minutes}:${seconds < 10 ? '0'+seconds : seconds}`)

  if (timeInMinutes < 0) {
    finishQuiz()
    clearInterval(interval)
  }
}

/**
 * Handling easy button click
 */
const handleEasyBtn = () => {
  setPrevScoreMobile(true)
  setShowContent('main')
  // setDiff('easy')
  diff='easy'

  runFetch(diff)
  runQuiz()
  console.log('RUNN EASY');
  interval = setInterval(startTimer, 1000)
}


/**
 * Handling medium button click
 */
 const handleMedBtn = () => {
  setPrevScoreMobile(true)
  setShowContent('main')
  // setDiff('medium')
  diff='medium'
  // runFetch(diff)
  runQuiz()
  interval = setInterval(startTimer, 1000)
}

/**
 * Handling hard button click
 */
 const handleHardBtn = () => {
  setPrevScoreMobile(true)
  setShowContent('main')
  // setDiff('hard')
  diff='hard'
  // runFetch(diff)
  runQuiz()
  interval = setInterval(startTimer, 1000)
}

/**
 * Handling show hint
 */
const showHint = () => {
  const question = getDifficultyQuestion(diff)
  console.log(question);
  setVisibleHint(false)
  const showHintText =()=> {
    console.log(data);
      data.data.map((data, i) => {
        console.log(data);
        if(data.question === currentQuestion){
              setHint(`<b className="text-lg">Hint:</b> ${data.hint}`)
        }
      })
  }
  switch(diff) {
    case 'easy':
      showHintText();
      break
    case 'medium':
      showHintText();
      break
    case 'hard':
      showHintText();
      break
  }
}

/**
 * Running quiz
 */
const runQuiz = () => {
  const question = getDifficultyQuestion(diff)
  console.log("run quiz");

      // setCurrentQuestion(data[question]?.question)
      console.log(data[question]?.question);
      console.log(question);
      console.log("🔥 current question : "+data);

  // switch(diff) {
  //   case 'easy':
  //     console.log('run SHOW QUESTION EASY');
  //     showQuestion();
  //     break
  //   case 'medium':
  //     showQuestion();
  //     break
  //   case 'hard':
  //     showQuestion();
  //     break
  // }
}

const random = () => {
  // by default jumlah soal 20
  let questionsLength=4;
  questionsLength= data?.data.length;
  console.log(data.data);
  console.log(questionsLength);
  return Math.floor(Math.random() * questionsLength)
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
  const showSoundUrl =()=> {
    //   res.then(({data})=>{
    //   console.log('idx='+idx);
    // });
    console.log(data);
    audio = new Audio('data.data[idx].sound_url')
  }
  switch(diff) {
    case 'easy':
      showSoundUrl();
      break
    case 'medium':
      showSoundUrl();
      break
    case 'hard':
      showSoundUrl();
      break
  }

  return idx
}

/**
 * Handle play audio
 */
const playAudio = () => {
  audio.play()
}

const callAlert = () => {
  let alertAudio = isCorrect
    ? new Audio('https://www.myinstants.com/media/sounds/correct_uQ7Arvh.mp3')
    : new Audio('https://www.myinstants.com/media/sounds/spongebob-disappointed-sound-effect.mp3')

  setTimeout(() => {
    setShowAlert(false)
    setAlertText('')
  }, 3800)
  setShowAlert(true)

  if (isFinished) {
    new Audio('https://www.myinstants.com/media/sounds/kids_cheering.mp3').play()
    setAlertText(`
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" style="height: 35px;" fill="none" viewBox="0 0 24 24" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3>You have finished the quiz!</h3>
    </div>
    <p>Good job! Your score was ${score}! Thank you for playing!</p>`)

    return
  }

  alertAudio.play()

  if (isCorrect) {
    setAlertBg('bg-green-500')
    setAlertText(`
    <div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" style="height: 35px;" fill="none" viewBox="0 0 24 24" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3>You are correct!</h3>
    </div>
    <p>Keep up the good work!</p>`)
  } else {
    setAlertBg('bg-red-500')
    setAlertText(
    `<div className="flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" style="height: 35px;" fill="none" viewBox="0 0 24 24" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3>You are wrong!</h3>
    </div>
    <p>Nice try! You can try again</p>`)
  }
}

const loading = () => {
  console.log('run loading method🔥🔥🔥🔥🔥🔥🔥🔥');
  setTimeout(() => {
    setMainLoading(false)
    setMainText('')
    setShowQuiz(true)
    runQuiz()
  }, 500)

  setMainLoading(true)
  setShowQuiz(false)
  setMainText(`
  <svg xmlns="http://www.w3.org/2000/svg" style='height: 50px;' class='spin' viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
  </svg>
  <p style="margin-left: 10px;">Getting next question... please Wait</p>`)
}

/**
 * Finishing quiz
 */
const finishQuiz = () => {
  setTimeout(() => {
    location.reload()
  }, 3900)
  callAlert(null, true)

  switch(diff) { // Insert the score to local storage
    case 'easy':
      localStorage.setItem('ezScore', score)
      break
    case 'medium':
      localStorage.setItem('medScore', score)
      break
    case 'hard':
      localStorage.setItem('hardScore', score)
      break
  }
}

/**
 * Handling submit
 * @param {Event} e
 */
const handleSubmit = (e) => {
  e.preventDefault()
  if (page <= 10) {
    if (e.target.answer.value.toLowerCase() === currentQuestion.toLowerCase()) {
      setIsCorrect(true)
      callAlert
      setScore(score + 10)
    } else {
      setIsCorrect(false)
      callAlert
    }
    e.target.answer.value=''

    page++
    return
  }

  finishQuiz()
}

if(isLoading) {
  return (
    <Loading/>
  )
}
  return (
    <div className={`w-full h-full min-h-screen overflow-x-hidden`}>
    <header className={`text-center w-11/12 max-w-lg m-auto mt-3 mb-20 px-3 py-1 text-white rounded-xl ${styles.header}`}>
      <h1 className='text-3xl' >English <span className='text-orang-500'>Quiz</span></h1>
    </header>
    <main className={`mx-auto flex flex-col-reverse md:flex-row md:justify-evenly items-center md:items-start`}>
      <div className={`p-5 md:p-6 mt-18 mb-[5px] left-auto text-center w-[90%] md:w-max rounded-xl ${styles.previousScore} ${PrevScoreMobile ? 'top-[30em]' : ''}`}>
        <h2 className='text-white mb-2 text-xl '>Your Previous Score</h2>
        <table className='text-white m-auto'>
          <thead>
            <tr className='border border-slate-400'>
              <th className="p-2 font-normal" style={{width: 80+'px', backgroundColor: '#147ee7'}}>Difficulty</th>
              <th className="p-2 font-normal" style={{width: 110+'px', backgroundColor: '#147ee7'}}>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border border-slate-400'>
              <th className="p-2 font-normal" scope="row" style={{backgroundColor:'#1bce574d',}}>Easy</th>
              <td>{ezScore}</td>
            </tr>
            <tr className='border border-slate-400'>
              <th className="p-2 font-normal" scope="row" style={{backgroundColor: '#dd9b214d',}}>Medium</th>
              <td>{medScore}</td>
            </tr>
            <tr className='border border-slate-400'>
              <th className="p-2 font-normal" scope="row" style={{backgroundColor: '#db2f1c4d',}}>Hard</th>
              <td>{hardScore}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={`flex flex-col-reverse md:flex-row justify-start items-center md:items-start w-full md:w-2/3 mb-8`}>
        <div className={`mb-4 md:mb-0 ml-0 md:ml-24 w-[90%] min-w-min md:w-1/2 md:min-w-[390px] text-white rounded-[12px] ${styles.wrapper}`} >
          <div className={`my-10 flex-col justify-center items-center ${showContent == 'difficulty' ? 'flex' : 'hidden'}`}>
            <h1 className='text-2xl' >Choose the difficulty!</h1>
            <div>
              <button className={`w-16 text-sm px-1 mt-5 md:text-xl text-white py-[5px] md:w-32 rounded-[10px] cursor-pointer outline-none mr-[5px] transition-colors duration-300 ease-in border-2 border-green-500 bg-green-500 bg-opacity-30 hover:bg-opacity-100 `} onClick={handleEasyBtn}>Easy</button>
              <button className={`w-16 text-sm px-1 mt-5 md:text-xl text-white py-[5px] md:w-32 rounded-[10px] cursor-pointer outline-none mr-[5px] transition-colors duration-300 ease-in border-2 border-orange-500 bg-orange-500 bg-opacity-30 hover:bg-opacity-100`}  onClick={handleMedBtn}>Medium</button>
              <button className={`w-16 text-sm px-1 mt-5 md:text-xl text-white py-[5px] md:w-32 rounded-[10px] cursor-pointer outline-none mr-[5px] transition-colors duration-300 ease-in border-2 border-red-500 bg-red-500 bg-opacity-30 hover:bg-opacity-100`} onClick={handleHardBtn}>Hard</button>
            </div>
          </div>

          <div className={`${showContent == 'main' ? 'inline' : 'hidden'} ${mainLoading? 'flex justify-center items-center font-bold text-2xl' : ''}`}>
            {/* <div className={`${showQuiz ? 'inline' : 'hidden'}`}> */}
            <div className={``}>
              <div className='flex justify-between'>
                <p className="p-1.5 font-medium text-green-500">Your score: {score}</p>
                <div className="flex space-x-1 p-1.5 font-medium text-green-500">
                  <p>Time left:</p>
                  <p>{timer}</p>
                </div>
              </div>
    
              <div className='relative'>
                <h3 className='font-medium text-xl md:text-2xl mt-3 mb-10 text-center'>Spell the word from the audio!</h3>
                <div className='flex items-center justify-between m-auto p-1.5 w-fit bg-blue-500 transition-colors duration-300 cursor-pointer rounded-lg  hover:bg-blue-600' onClick={playAudio}>
                  <Image width={25} height={25} src='/asset/playBtn.png' alt='Play button' />
                  <span className='ml-[3px] md:text-lg text-sm text-white'>Play Audio</span>
                </div>
              </div>
    
              <form className='flex flex-col m-auto mt-4 w-[48%] ' onSubmit={handleSubmit}>
                <input name="answer"
                className='text-sm md:text-base mb-2 p-1.5 md:p-2 border border-blue-500 rounded-md bg-white text-slate-900 bg-opacity-70 transition-colors duration-300 ease-in placeholder:text-xs md:placeholder:text-sm focus:bg-opacity-100 focus:outline-none focus:shadow-sm shadow-blue-300'
                type='text' placeholder='Write your answer here' autoComplete="off" />
                <div className='flex justify-between'>
                  <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-md py-0.5 px-2  rounded-md focus:outline-none'>Submit</button>
                  <button type='reset' className="flex justify-center items-center rounded-md outline-none text-md py-0.5 px-2  text-white border-2 border-blue-500 bg-blue-500 bg-opacity-30 hover:bg-opacity-100">reset</button>
                </div>
              </form>
    
              <div className='flex flex-col justify-center items-center m-auto mt-7 p-2 w-[68%] text-sm'>
                <p>Get stuck? Get a hint <span  className={`${visibleHint ? 'inline' : 'hidden'} underline cursor-pointer`} onClick={showHint}>here.</span></p>
                <p className='text-base mt-2'>{hint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden md:inline"></div>
    </main>

    <div className="absolute top-0 left-0 bg-slate-800 w-full h-full -z-10 overflow-hidden">
      <div className='absolute w-64 h-64 rounded-full bg-orange-400 -top-[30%] -left-[35%] md:-top-[10%] md:-left-[5%]'></div>
      <div className='absolute w-64 h-64 rounded-full bg-orange-400 bottom-[25%] -right-[30%] md:-bottom-[10%] md:-right-[5%]'></div>
      <div className='absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-400 top-[18%] right-[15%]'></div>
      <div className='absolute w-24 h-24 rounded-full bg-orange-400 top-3/4 md:top-[58%] right-[60%]'></div>
    </div>

    <div className={`alert flex flex-col justify-center items-center absolute left-1/2 right-1/2 top-[142px] w-max py-2 px-8 rounded-[7px] text-white text-2xl  ${showAlert ? 'animateIn' : 'animateOut'} ${alertBg}`} ></div>
    </div>
  )
}
