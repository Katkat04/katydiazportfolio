'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Greetings() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    const pinWrapper = pinWrapperRef.current

    if (!video || !container || !pinWrapper) return

    let st: ScrollTrigger | null = null
    let animation: gsap.core.Tween | null = null

    const initAnimation = () => {
      const duration = video.duration || 5
      
      animation = gsap.to(video, {
        scale: 2.1,
        y: 200,
        ease: 'none',
        paused: true
      })
      
      st = ScrollTrigger.create({
        trigger: pinWrapper,
        start: 'top top',
        end: `+=${duration * 100}vh`,
        scrub: true,
        pin: pinWrapper,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (animation && video.duration) {
            animation.progress(self.progress)
            video.currentTime = video.duration * self.progress
          }
        }
      })
    }

    const handleMetadata = () => initAnimation()

    if (video.readyState >= 2) {
      initAnimation()
    } else {
      video.addEventListener('loadedmetadata', handleMetadata, { once: true })
    }

    return () => {
      video?.removeEventListener('loadedmetadata', handleMetadata)
      
      if (st) {
        st.kill(true)
        st = null
      }
      
      if (animation) {
        animation.kill()
        animation = null
      }
      
      ScrollTrigger.refresh()
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-black">
      <div ref={pinWrapperRef} className="relative w-full h-screen">
        <div className="absolute inset-0 bg-[url('/fondodiamejor.png')] h-screen bg-cover bg-center" />
        <div className="absolute inset-0 flex items-center justify-center">
          <video
            ref={videoRef}
            src="/Completo.webm"
            className="w-auto h-[200px]"
            muted
            playsInline
            preload="metadata"
          />
        </div>
      </div>
    </section>
  )
}