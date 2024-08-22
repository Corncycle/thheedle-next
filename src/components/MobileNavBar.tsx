'use client'

import { robotoHeavy, robotoThin } from '../app/fonts'

export default function MobileNavBar() {
  return (
    <div className="w-full p-3 flex flex-col items-center gap-3 md:hidden">
      <div className="w-full flex flex-row justify-between">
        <div className="flex items-center gap-2">
          <img
            className="h-8 drop-glow-black object-contain hover:drop-glow-white transition-all"
            src="/512x512white.png"
            alt="thheedle"
          ></img>
          <h2
            className={`${robotoHeavy.className} text-2xl text-white tracking-wide`}
          >
            thheedle
          </h2>
        </div>
        <img src="/hamburger.svg"></img>
      </div>
      <hr className="w-full m-0 p-0 h-[1px] bg-zinc-700 border-none" />
    </div>
  )
}
