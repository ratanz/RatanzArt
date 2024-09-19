import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const images = [
  { r: 1, c: 3 }, { r: 1, c: 8 }, { r: 2, c: 1 }, { r: 2, c: 6 },
  { r: 3, c: 4 }, { r: 3, c: 8 }, { r: 4, c: 1 }, { r: 4, c: 7 },
  { r: 5, c: 3 }, { r: 5, c: 5 }, { r: 6, c: 1 }, { r: 6, c: 8 },
  { r: 7, c: 3 }, { r: 7, c: 7 }, { r: 8, c: 1 }, { r: 8, c: 5 },
  { r: 9, c: 3 }, { r: 9, c: 8 }
]

const App = () => {
  const containerRef = useRef()

  useEffect(() => {
    // Lenis smooth scrolling boilerplate
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // GSAP animation
    document.querySelectorAll('.elem').forEach(elem => {
      let image = elem.querySelector('img')
      let tl = gsap.timeline()

      let Xtransform = gsap.utils.random(-100, 100)
      tl
        .set(image, {
          transformOrigin: `${Xtransform < 0 ? 0 : '100%'} center`,
        }, 'start')
        .to(image, {
          scale: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: image,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          }
        }, 'start')
    })

    return () => {
      lenis.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="w-full bg-zinc-900">
      <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 overflow-hidden">
        {images.map((img, index) => (
          <div
            key={index}
            className={`elem col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-${index === 7 ? '2' : '1'}`}
            style={{ 
              '--r': img.r, 
              '--c': img.c,
              aspectRatio: '1 / 1',
            }}
          >
            <img 
              src={`/images/image${index + 1}.jpg`} 
              alt={`Image ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <div className="fixed top-0 w-full h-full font-['Helvetica_Now_Display'] flex flex-col items-center justify-center bg-black bg-opacity-50">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-white mb-4 sm:mb-8">Ratan's Art</h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">ラタンのアート</h2>
      </div>
      <div className="w-full min-h-screen bg-[#D1D1D1] flex items-center justify-center mx-auto py-8 sm:py-16 text-center">
        <p className="w-5/6 sm:w-4/6 text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.5] text-black text-left">
          From the dawn of civilisation onwards crowds 
          have always undergone the influence of illusions.  
          It is to the creators of illusions that they have raised more temples,
          statues, and altars than to any other class of men.
        </p>
      </div>
    </div>
  )
}

export default App
