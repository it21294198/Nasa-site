import React from 'react'
import logo2 from '../../public/logo2.png'
import x from '../../public/x.png'
import fb from '../../public/fb.png'
import yt from '../../public/yt.png'

export default function Footer() {
  return (
  <>
  <footer className="footer p-10 bg-base-300 text-base-content">
  <nav>
  <img className="lg:w-30 lg:h-24 lg:p-4 md:w-25 md:h-20 md:p-1 relative md:mb-20 lg:mb-0" src={logo2} alt="Footer Logo"/>
  </nav> 
  <nav>
    <h6 className="footer-title">Views</h6> 
    <a href='/pod' className="link link-hover">POD</a>
    <a href='/earth' className="link link-hover">Earth</a>
    <a href='/mars' className="link link-hover">Mars</a>
  </nav> 
  <nav>
    <h6 className="footer-title">Social</h6> 
    <div className="grid grid-flow-col gap-4">
    <img src={fb} className="mr-2 hover:scale-110" alt="Facebook"/>
    <img src={yt} className="mr-2 hover:scale-110" alt="YouTube"/>
    <img src={x} className="w-10 h-10 hover:scale-110" alt="X"/>
    </div>
  </nav>
</footer>
</>
  );
}

