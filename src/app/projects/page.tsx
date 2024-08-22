import NavBar from '@/components/NavBar'
import { roboto } from '../fonts'
import MobileNavBar from '@/components/MobileNavBar'

export default function Home() {
  return (
    <>
      <title>thheedle - Projects</title>
      <MobileNavBar></MobileNavBar>
      <div className="pt-8 w-full max-w-7xl mt-8">
        <div className="text-white">
          <NavBar showLogo={true}></NavBar>
          <div className={`pt-12 text-xl text-center ${roboto.className}`}>
            We have no projects.
          </div>
        </div>
      </div>
    </>
  )
}
