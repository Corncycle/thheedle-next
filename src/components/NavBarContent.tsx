'use client'

import { usePathname } from 'next/navigation'
import NavItem from './NavItem'
import NavSpacer from './NavSpacer'

export default function NavBarContent() {
  const pathName = usePathname()

  return (
    <ul className="relative w-full h-8 justify-center items-center gap-4 hidden md:flex">
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
