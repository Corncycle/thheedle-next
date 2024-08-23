'use client'

import { robotoHeavy } from '@/app/fonts'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dispatch } from 'react'

export default function MobileNavBarContent({
  isVisible,
  setVisible,
}: {
  isVisible?: boolean
  setVisible?: Dispatch<boolean>
}) {
  const pathName = usePathname()

  return (
    <div
      className={`z-20 absolute inset-0 bg-[rgba(0,0,0,0.7)] ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-all duration-300 flex flex-col items-end gap-3 p-3 md:hidden`}
      onClick={() => {
        setVisible?.(false) // if we add more functionality in the modal we may have to investigate bubbling here
      }}
    >
      <img
        className={`cursor-pointer h-8 opacity-100`}
        src="/close.svg"
        onClick={() => {
          setVisible?.(false)
        }}
      ></img>
      <div className="flex flex-col p-3 gap-4 opacity-100">
        {['Home', 'Employees', 'Projects', 'About'].map(
          (s: string, i: number) => {
            const baseRoute = pathName.split('/')[1]
            const selected =
              baseRoute === s.toLowerCase() ||
              (baseRoute === '' && s === 'Home')

            return (
              <Link
                key={i}
                className="no-underline"
                href={s === 'Home' ? '/' : `/${s.toLowerCase()}`}
              >
                <div
                  className={`text-right text-white ${
                    selected ? 'underline' : 'no-underline'
                  } underline-offset-4 decoration-[3px] text-glow-black hover:text-glow-white transition-all ${
                    robotoHeavy.className
                  } text-3xl text-white`}
                >
                  {s}
                </div>
              </Link>
            )
          }
        )}
      </div>
    </div>
  )
}
