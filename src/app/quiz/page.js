'use client'
import useSWR from 'swr'
import React, { useEffect, useRef, useState } from 'react'
import styles from '@/app/Quiz.module.css'
import Loading from '@/components/Loading'
import Image from 'next/image'
import LoadingNextQuestion from '@/components/LoadingNextQuestion'
import AlertFinish from '@/components/AlertFinish'
import AlertCorrect from '@/components/AlertCorrect'
import AlertWrong from '@/components/AlertWrong'
import Link from 'next/link'




// Initializing element
const ezScore = localStorage.getItem('ezScore') ? localStorage.getItem('ezScore') : '0'
const medScore = localStorage.getItem('medScore') ? localStorage.getItem('medScore') : '0'
const hardScore = localStorage.getItem('hardScore') ? localStorage.getItem('hardScore') : '0'

const fetcher= async(url)=> {
  const response = await fetch(`${url}`);
  const {data} = await response.json();
  const totalQuestions=data.total;
  console.log("total questions : " + totalQuestions);
  // if(totalQuestions>19 ){
    //   const randomPages = Math.round(Math.random() * (Math.floor(totalQuestions/20)-1) + 1);
    //   console.log(randomPages);
    //   const response = await fetch(`${url}&page=${randomPages}`);
    //   const {data} = await response.json();
        // console.log("current page : " + data.current_page);
  //   return data
  // }
  return data;
}

export default function Quiz() {
  const [showAlert, setShowAlert]= useState(false)
  const [alertText, setAlertText]= useState(null)
  const [mainLoading, setMainLoading]= useState(false)
  const [PrevScoreMobile, setPrevScoreMobile]= useState(false)
  const [showContent, setShowContent]= useState('difficulty')
  const [hint, setHint]= useState(null)
  const [score, setScore]= useState(0)
  const [timer, setTimer] = useState(300); // 300 seconds (5 menit)
  const [timerStart, setTimerStart] = useState(false); 
  const [visibleHint, setVisibleHint]= useState(true)
  const [isCorrect, setIsCorrect]= useState()
  const [hintRemain, setHintRemain]= useState(2) //membatasi hint 2 kali
  const [page, setPage]= useState(1)
  // const [diff, setDiff]= useState(null)   
  let diff='easy';
  const [currentQuestion, setCurrentQuestion]= useState(null)   
  const [audio, setAudio]= useState(null)   
  const [level, setLevel]= useState(null)

  const uri= `${process.env.API_URL}?level=${level}`
  const { data, isLoading, error } = useSWR(level ? uri : null, fetcher)
  const runFetch=(lvl)=>{
    if(!data){
      setLevel(lvl)
    }
  }

const answered = []

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};
useEffect(() => {
  let intervalId = null;

  if (timerStart) {
    intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  }

  return () => {
    clearInterval(intervalId);
  };
}, [timerStart]);

const resultRef= useRef(null)
useEffect(() => {
  if(timer === 0){
    switch(diff) { 
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
    callAlert(true)
    setTimeout(() => {
      resultRef.current.click();
    }, 2000);
  }
}, [timer]);


const handleEasyBtn = async() => {
  setPrevScoreMobile(true)
  setShowContent('main')
  diff='easy'

  runFetch(diff)
  //runQuiz()
  console.log('RUNN EASY');
  setTimerStart(true)
}

const runQuiz = () => {
  const idx = getQuestionIdx()
  setCurrentQuestion(data.data[idx]?.question)
  console.log("run quiz");
}
    
const random = () => {
  // set data length default to 20
const dataLength = 10;
// const dataLength = data.data.length;
return Math.floor(Math.random() * dataLength)
}
    
const getQuestionIdx = () => {
  let idx = random()
    
    // Filtering is the current question has passed yet
    const filterQuestion = answered.find(index => index === idx)
  if (page > 1 && filterQuestion !== undefined) {
    idx = random()  
  }
  answered.push(idx)
  setAudio(new Audio(data.data[idx].sound_url))

  return idx
}

  /**
   * Handle play audio
  */
 const playAudio = () => {
  console.log(audio);
   audio.play()
  }
  
  const loading = () => {
    setTimeout(() => {
      setMainLoading(false)
      runQuiz()
    }, 500)
    setMainLoading(true)
  }


const finishQuiz = () => {
  setTimeout(() => {
    resultRef.current.click();
  }, 3900)
  callAlert(true)

  switch(diff) { 
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


  const handleSubmit = (e) => {
    e.preventDefault()
    if (page <= 3) {
      setVisibleHint(true)
      if (e.target.answer.value.toLowerCase() === currentQuestion.toLowerCase()) {
        setIsCorrect(true)
        callAlert()
        setScore(score + 10)
      } else {
        setIsCorrect(false)
        callAlert()
      }
      e.target.answer.value=''
      
      setPage(page + 1)
      console.log(page,"🔥");
      loading()
      return
    }
    console.log(page,"🔥🔥🔥");
    finishQuiz()
  }

  useEffect(() => {
    if(data){
      runQuiz()
    }
  }, [data])
  
const showHint = () => {
  if(hintRemain>0){
    setHintRemain(hintRemain-1)
    setVisibleHint(false)
      data.data.map((data) => {
        if(data.question === currentQuestion){
              setHint(data.hint)
        }
      })
      return
    }
    alert("You have reached the maximum limit of using hints.")
}
  
// ALERT
const callAlert = (isFinished=false) => {
    let alertAudio = isCorrect
      ? new Audio('https://www.myinstants.com/media/sounds/correct_uQ7Arvh.mp3')
      : new Audio('https://www.myinstants.com/media/sounds/spongebob-disappointed-sound-effect.mp3')
  
    setTimeout(() => {
    setShowAlert(false)
    setAlertText(null)
  }, 20000)
  setShowAlert(true)

  if (isFinished) {
      new Audio('https://www.myinstants.com/media/sounds/kids_cheering.mp3').play()
      setAlertText(<AlertFinish score={score}/>)
      return
    }
  else if (isCorrect) {
    setAlertText(<AlertCorrect/>)
  } else {
    setAlertText(<AlertWrong/>)
  }
  alertAudio.play()
}


if(isLoading) {
  return (
    <Loading/>
    )
  }

  return (
    <div className={`w-full h-full min-h-screen overflow-x-hidden`}>
    <header className={`text-center w-11/12 max-w-lg m-auto mt-3 mb-20 px-3 py-1 text-white rounded-xl ${styles.header}`}>
    <Link href='/'><h1 className='text-3xl' >English <span className='text-orang-500'>Quiz</span></h1></Link>
    </header>
    <main className={`mx-auto flex flex-col-reverse md:flex-row md:justify-evenly items-center md:items-start`}>
      <div className={`p-5 md:p-6 mt-18 mb-[5px] left-auto text-center w-[90%] md:w-max rounded-xl ${styles.previousScore} ${PrevScoreMobile ? 'top-[30em]' : ''}`}>
        <h2 className='text-white mb-2 text-xl '>Your Previous Score</h2>
        <table className='text-white m-auto'>
          <thead>
            <tr className='border border-slate-400'>
              <th className="p-2 font-normal w-[80px] bg-blue-500">
              {/* Difficulty */}
              Your
              </th>
              <th className="p-2 font-normal w-[110px] bg-blue-500">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr className='border border-slate-400'>
              <th className="p-2 font-normal bg-green-500 bg-opacity-30" scope="row">
              {/* Easy */}
              latest
              </th>
              <td>{ezScore}</td>
            </tr>
            {/* <tr className='border border-slate-400'>
              <th className="p-2 font-normal bg-orange-500 bg-opacity-30" scope="row">Medium</th>
              <td>{medScore}</td>
            </tr>
            <tr className='border border-slate-400'>
              <th className="p-2 font-normal bg-red-500 bg-opacity-30" scope="row">Hard</th>
              <td>{hardScore}</td>
            </tr> */}
          </tbody>
        </table>
      </div>
      <div className={`flex flex-col-reverse md:flex-row justify-start items-center md:items-start w-full md:w-2/3 mb-8`}>
        <div className={`mb-4 md:mb-0 ml-0 md:ml-24 w-[90%] min-w-min md:w-1/2 md:min-w-[390px] text-white rounded-[12px] ${styles.wrapper} ${mainLoading? 'mt-24' : ''}`} >
          <div className={`my-10 flex-col justify-center items-center ${showContent == 'difficulty' ? 'flex' : 'hidden'}`}>
            <h1 className='text-2xl' >
            {/* Choose the difficulty! */}
            Are you ready?
            </h1>
            <div>
              <button className={`w-16 text-sm px-1 mt-5 md:text-xl text-white py-[5px] md:w-32 rounded-[10px] cursor-pointer outline-none mr-[5px] transition-colors duration-300 ease-in border-2 border-green-500 bg-green-500 bg-opacity-30 hover:bg-opacity-100 `} onClick={handleEasyBtn}>
              {/* Easy */}
              Start
              </button>
              {/* <button className={`w-16 text-sm px-1 mt-5 md:text-xl text-white py-[5px] md:w-32 rounded-[10px] cursor-pointer outline-none mr-[5px] transition-colors duration-300 ease-in border-2 border-orange-500 bg-orange-500 bg-opacity-30 hover:bg-opacity-100`}  onClick={handleMedBtn}>Medium</button>
              <button className={`w-16 text-sm px-1 mt-5 md:text-xl text-white py-[5px] md:w-32 rounded-[10px] cursor-pointer outline-none mr-[5px] transition-colors duration-300 ease-in border-2 border-red-500 bg-red-500 bg-opacity-30 hover:bg-opacity-100`} onClick={handleHardBtn}>Hard</button> */}
            </div>
          </div>

          <div className={`${showContent == 'main' ? 'inline' : 'hidden'} ${mainLoading? 'flex justify-center items-center font-bold text-xl' : ''}`}>
            {
              mainLoading ? <LoadingNextQuestion/> : (
              <div>
                <div className='flex justify-between'>
                  <p className="p-1.5 font-medium text-green-500">Your score: {score}</p>
                  <div className="flex space-x-1 p-1.5 font-medium text-green-500">
                    <p>Time left:</p>
                    <p>{formatTime(timer)}</p>
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
                    <Link href="/quiz">
                        <button type='reset' className="flex justify-center items-center rounded-md outline-none text-md py-0.5 px-2  text-white border-2 border-blue-500 bg-blue-500 bg-opacity-30 hover:bg-opacity-100">reset</button>
                    </Link>
                  </div>
                </form>
      
                <div className='flex flex-col justify-center items-center m-auto mt-7 p-2 w-[68%] text-sm'>
                  <p>Get stuck? Get a hint <span  className={`${visibleHint ? 'inline' : 'hidden'} underline cursor-pointer`} onClick={showHint}>here.</span></p>
                  <p className={`text-base mt-2 ${visibleHint ? 'hidden' : 'inline'}`}><b className={`text-lg`}>Hint:</b> {hint}</p>
                </div>
              </div>
            )}
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

        <div className={`flex-col justify-center items-center absolute  left-1/2 -translate-x-1/2 w-max h-max py-2 px-8 rounded-lg text-white text-xl  ${showAlert ? 'flex top-20 opacity-100 duration-300 ease-out' : 'opacity-0 -top-32'} ${isCorrect ? 'bg-green-500' : 'bg-red-500'} `} >
          {alertText}
        </div>

        <a ref={resultRef} href="/results" className='hidden'></a>
    </div>
  )
}
