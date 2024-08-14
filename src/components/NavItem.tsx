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
    <li className={`${robotoHeavy.className} text-2xl text-white`}>
      <Link
        className={`relative text-white ${
          isSelected ? 'underline' : 'no-underline'
        } underline-offset-4 decoration-2 hover:text-glow`}
        href={href}
      >
        {name}
      </Link>
    </li>
  )
}
