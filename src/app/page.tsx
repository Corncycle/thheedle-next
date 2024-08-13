"use client"

import styles from "./custom.module.css"

import { useEffect, useState } from "react";
import { setupModel, threeReady } from "../components/thheedleModel";
import { roboto, robotoHeavy, robotoThin } from "./fonts";

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

  return (<>
    <canvas id="thheedle-model" className={`absolute left-0 pointer-events-none md:left-[-65%] ${threeReady ? styles.fadeIn : "hidden"}`}></canvas>
    <div className="relative min-h-full w-full max-w-7xl flex flex-col justify-center items-center md:items-end">
      <div className="relative md:mr-[10%]">
        <h1 className={`${robotoThin.className} text-center text-white text-6xl md:text-8xl whitespace-nowrap`}>Welcome to<br />a brand-new<br /><strong className={`${robotoHeavy.className} font-bold tracking-wide`}>thheedle</strong></h1>
      </div>
    </div>
    </>
  );
}
