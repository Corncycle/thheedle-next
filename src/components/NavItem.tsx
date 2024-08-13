import { roboto } from '@/app/fonts'
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
    <li className={`${roboto.className} text-xl text-white`}>
      <Link
        className={`text-white ${
          isSelected ? 'underline' : 'no-underline'
        } underline-offset-4 decoration-2`}
        href={href}
      >
        {name}
      </Link>
    </li>
  )
}
