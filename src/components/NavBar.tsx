'use client'

import NavBarContent from './NavBarContent'

export default function NavBar() {
  return (
    <div className="relative w-full">
      <div
        className="absolute w-full"
        style={{
          maskImage:
            'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)',
          top: '-100%',
          bottom: '-100%',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            maskImage:
              'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 3%, rgba(0,0,0,1) 97%, rgba(0,0,0,0) 100%)',
          }}
        >
          <div
            className="absolute inset-0 bg-repeat"
            style={{ backgroundImage: 'url(/dots2.png)' }}
          ></div>
        </div>
      </div>
      <NavBarContent></NavBarContent>
    </div>
  )
}
