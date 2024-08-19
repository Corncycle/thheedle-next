import { robotoHeavy } from '@/app/fonts'
import Link from 'next/link'

export default function NavItem({
  name,
  href,
  isSelected,
}: {
  name: string
  href: string
  isSelected: boolean
}) {
  return (
    <li className={`${robotoHeavy.className} text-2xl text-white max-h-full`}>
      <Link
        className={`relative text-white inline-block ${
          isSelected ? 'underline' : 'no-underline'
        } underline-offset-4 decoration-2 text-glow-black hover:text-glow-white transition-all`}
        href={href}
      >
        {name}
      </Link>
    </li>
  )
}
