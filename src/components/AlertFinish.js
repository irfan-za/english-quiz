import React from 'react'

export default function AlertFinish({score}) {
  return (
    <>
      <div className='flex items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" className='h-9' fill="none" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className='text-lg md:text-xl'>You have finished the quiz!</h3>
      </div>
      <p className='text-base md:text-lg'>Good job! Your score was {score}!</p>
      <p className='text-base md:text-lg'>Thank you for playing!</p>

    </>
  )
}
