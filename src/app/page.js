"use client"
import Loading from "@/components/Loading";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [loading, setLoading] = useState(false)
  const router=useRouter()
  return (
    <>
  <div className="container">
    <div id="tambahan"></div>
    <div className="mid">
      <div>
        <h1>English <span>Quiz</span></h1>
        <p className="atas"><span id="a">Check</span> <span id="b">your</span> <span id="c">english</span> <span id="d">skill</span> <span id="e">now!</span></p>
      </div>
      <div className="kanan">
        <Image width={400} height={400} src="svg/icon.svg" alt="Icon Quiz"/>
      </div>
    </div>
    <div className="bwh">
      <button className="scroll" onClick={()=>{
        setLoading(true)
        setTimeout(() => {
          router.push('/quiz')
        }, 1000)
      }} >START</button>
    </div>
  </div>

  <div className={`${loading? 'inline' : 'hidden'}`}>
    <Loading/>
  </div>
</>
  )
}


