'use client'

import { usePathname } from 'next/navigation'
import NavItem from './NavItem'
import NavSpacer from './NavSpacer'
import Link from 'next/link'

export default function NavBarContent({ showLogo }: { showLogo?: boolean }) {
  const pathName = usePathname()

  return (
    <ul className="relative w-full h-8 justify-center items-center gap-4 hidden md:flex">
      {showLogo && (
        <Link className="h-full" href="/">
          <img
            className="h-full drop-glow-black object-contain hover:drop-glow-white transition-all"
            src="/512x512white.png"
            alt="thheedle"
          ></img>
        </Link>
      )}
      {[
        'Home',
        'spacer',
        'Employees',
        'spacer',
        'Projects',
        'spacer',
        'About',
      ].map((s: string, i: number) => {
        if (s === 'spacer') {
          return <NavSpacer key={i} />
        }
        const baseRoute = pathName.split('/')[1]
        const selected =
          baseRoute === s.toLowerCase() || (baseRoute === '' && s === 'Home')
        return (
          <NavItem
            isSelected={selected}
            name={s}
            href={s === 'Home' ? '/' : `/${s.toLowerCase()}`}
            key={i}
          ></NavItem>
        )
      })}
    </ul>
  )
}
