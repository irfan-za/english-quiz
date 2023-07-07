'use client'
import useSWR from 'swr'
import styles from '@/app/Quiz.module.css'
import Link from 'next/link'

const scoreFetcher=async(url)=>{
  const response = await fetch(url);
  const data = await response.json();
  return data
}

export default function page() {
    // fetch score data 
    const { data:scoreFromDb, isScoreLoading, error:errorScore } = useSWR(`${process.env.API_URL}/scores`, scoreFetcher)

    const ezScore = scoreFromDb==undefined ? 0 : scoreFromDb[scoreFromDb.length-1]?.ez_score;
    // const medScore = localStorage.getItem('medScore') ? localStorage.getItem('medScore') : '0'
    // const hardScore = localStorage.getItem('hardScore') ? localStorage.getItem('hardScore') : '0'
  return (
    <div className={`w-full h-full min-h-screen overflow-x-hidden`}>
    <header className={`text-center w-11/12 max-w-lg m-auto mt-3 mb-20 px-3 py-1 text-white rounded-xl ${styles.header}`}>
    <Link href='/'><h1 className='text-3xl' >English <span>Quiz</span></h1></Link>
    </header>
    <main className={`mx-auto flex flex-col justify-center items-center`}>
    <div className={`text-center w-11/12 max-w-lg m-auto mt-3 mb-20 px-3 py-1 text-white rounded-xl ${styles.header}`}>
      <h1 className='text-xl' >Want to play again? click{' '}
        <Link href='/quiz'><span className=' hover:underline hover:cursor-pointer'>here </span></Link>
      </h1>
    </div>
      <div className={`p-5 md:p-6 mt-18 mb-[5px] left-auto text-center w-[90%] max-w-lg rounded-xl ${styles.previousScore}`}>
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
    </main>

    <div className="absolute top-0 left-0 bg-slate-800 w-full h-full -z-10 overflow-hidden">
      <div className='absolute w-64 h-64 rounded-full bg-orange-400 -top-[30%] -left-[35%] md:-top-[10%] md:-left-[5%]'></div>
      <div className='absolute w-64 h-64 rounded-full bg-orange-400 bottom-[25%] -right-[30%] md:-bottom-[10%] md:-right-[5%]'></div>
      <div className='absolute w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-400 top-[18%] right-[15%]'></div>
      <div className='absolute w-24 h-24 rounded-full bg-orange-400 top-3/4 md:top-[58%] right-[60%]'></div>
    </div>

    </div>
  )
}
