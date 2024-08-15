import NavBar from '@/components/NavBar'
import { roboto } from '../fonts'

export default function Home() {
  return (
    <div className="pt-8 w-full max-w-7xl mt-8">
      <div className={`text-white ${roboto.className}`}>
        <NavBar></NavBar>
        <div className="pt-12 text-xl text-center">
          This page is under construction.
        </div>
      </div>
    </div>
  )
}
