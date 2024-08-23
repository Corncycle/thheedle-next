import NavBar from '@/components/NavBar'
import { roboto } from '../fonts'
import MobileNavBar from '@/components/MobileNavBar'

export default function Home() {
  return (
    <>
      <title>thheedle - Employees</title>
      <MobileNavBar></MobileNavBar>
      <div className="md:pt-8 w-full max-w-7xl mt-8">
        <div className={`text-white ${roboto.className}`}>
          <NavBar showLogo={true}></NavBar>
          <div className="md:pt-12 text-xl text-center">
            This page is under construction
          </div>
        </div>
      </div>
    </>
  )
}
