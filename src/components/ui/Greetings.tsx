'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Greetings() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const video = videoRef.current
      const container = containerRef.current
      const svg = svgRef.current
      const svgContainer = svgContainerRef.current

      if (!video || !container || !svg || !svgContainer) return

      const paths = svg.querySelectorAll('path')

      // 1. Configuración inicial de los paths del SVG
      paths.forEach(path => {
        const length = (path as SVGPathElement).getTotalLength()
        const originalFill = path.getAttribute('fill') || 'white'
        path.setAttribute('data-original-fill', originalFill)

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          fill: 'transparent',
          stroke: 'white',
          strokeWidth: 2
        })
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=50%',
          pin: true,
          scrub: 2,
          markers: false
        }
      })

      tl.to(video, {
        scale: 2.1,
        y: () => window.innerHeight * 0.25,
        ease: 'none',
        transformOrigin: 'center center',
        onUpdate: function () {
          if (video.duration) {
            video.currentTime = video.duration * this.progress()
          }
        }
      }, 0)


      tl.to(paths, {
        strokeDashoffset: 0,
        stagger: 0.1,
        duration: 0.5,
      }, 0)

      tl.to(paths, {
        fill: (i, target) => target.getAttribute('data-original-fill'),
        stroke: 'white',
        duration: 0.3,
      }, 0.4)

      tl.to(svgContainer, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.2
      }, 0.8)

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section  ref={containerRef}  className="relative w-full h-screen overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[url('/fondodia.png')] bg-cover bg-center" />

      <div className="absolute top-[250] h-[50px] inset-0 flex items-center justify-center z-20">
        <video
          ref={videoRef}
          src="/Completo.webm"
          className="w-auto h-[200px] transition-opacity duration-500"
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div ref={svgContainerRef} className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
        <div className="w-[410px] h-[543px]">
          <svg ref={svgRef} width="100%" height="100%" viewBox="0 0 915 843" fill="none" className="text-white">
          </svg>
        </div>
      </div>
    </section>
  )
} 