'use client'

import Link from 'next/link'
import { robotoHeavy, robotoThin } from '../app/fonts'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import MobileNavBarContent from './MobileNavBarContent'

export default function MobileNavBar() {
  const [modalOpen, setModalOpen] = useState(false)
  const pathName = usePathname()

  return (
    <>
      <div className="w-full p-3 flex flex-col items-center gap-3 md:hidden">
        <div className="w-full flex flex-row justify-between">
          <div className="flex items-center gap-2">
            <Link
              className="h-full flex gap-2 drop-glow-black  hover:drop-glow-white transition-all no-underline"
              href="/"
            >
              <img
                className="h-8 object-contain"
                src="/512x512white.png"
                alt="thheedle"
              ></img>
              <h2
                className={`${robotoHeavy.className} text-2xl text-white tracking-wide`}
              >
                thheedle
              </h2>
            </Link>
          </div>
          <img
            className={`cursor-pointer ${
              modalOpen ? 'opacity-0' : ''
            } transition-all duration-300`}
            src="/hamburger.svg"
            onClick={() => {
              setModalOpen(true)
            }}
          ></img>
        </div>
        <hr className="w-full m-0 p-0 h-[1px] bg-zinc-700 border-none" />
      </div>
      <MobileNavBarContent isVisible={modalOpen} setVisible={setModalOpen} />
    </>
  )
}
