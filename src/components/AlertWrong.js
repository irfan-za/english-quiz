import React from 'react'

export default function AlertWrong() {
  return (
    <>
      <div className="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className='h-9' fill="none" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3>You are wrong!</h3>
      </div>
      <p>Nice try! You can try again</p>
    </>
  )
}
