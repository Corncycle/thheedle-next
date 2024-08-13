import { roboto } from '@/app/fonts'

export default function NavSpacer() {
  return (
    <div className={`${roboto.className} text-xl text-white select-none`}>
      •
    </div>
  )
}
