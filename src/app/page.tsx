'use client'

import styles from './custom.module.css'

import { useEffect, useState } from 'react'
import { setupModel, threeReady } from '../components/thheedleModel'
import { roboto, robotoHeavy, robotoThin } from './fonts'
import NavBar from '@/components/NavBar'

export default function Home() {
  const [canvasVisible, setCanvasVisible] = useState(false)

  useEffect(() => {
    setupModel()
  }, [])

  useEffect(() => {
    if (threeReady) {
      setCanvasVisible(true)
    }
  }, [threeReady])

  return (
    <>
      <canvas
        id="thheedle-model"
        className={`absolute left-0 pointer-events-none md:left-[-65%] ${
          canvasVisible ? styles.fadeIn : 'hidden'
        }`}
      ></canvas>
      <div className="relative min-h-full w-full max-w-7xl flex flex-col gap-20 justify-center items-center md:items-end">
        <div className="absolute top-0 w-full h-4 bg-slate-600 md:hidden"></div>
        <div className="relative md:mr-[10%] z-10">
          <h1
            className={`${robotoThin.className} text-center text-white text-6xl md:text-8xl whitespace-nowrap`}
          >
            Welcome to
            <br />a brand-new
            <br />
            <strong
              className={`${robotoHeavy.className} font-bold tracking-wide`}
            >
              thheedle
            </strong>
          </h1>
        </div>
        <NavBar></NavBar>
      </div>
    </>
  )
}
