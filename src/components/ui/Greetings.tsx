'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const PHRASES = [
  { text: "Hello, I'm Katy.",        side: 'left'  },
  { text: "I'm a frontend developer.", side: 'right' },
  { text: "I love animations.",    side: 'left'  },
  { text: "And this is my world.",     side: 'right' },
] as const

const px: React.CSSProperties = { shapeRendering: 'crispEdges' }

function BubbleRight({ text }: { text: string }) {
  return (
    <svg className="w-[180px] md:w-[280px]" viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg">
      <rect style={px} x="126" y="26" width="420" height="110" fill="#000"/>
      <rect style={px} x="114" y="38" width="12" height="86" fill="#000"/>
      <rect style={px} x="546" y="38" width="12" height="86" fill="#000"/>
      <rect style={px} x="120" y="32" width="6" height="6" fill="#000"/>
      <rect style={px} x="540" y="32" width="6" height="6" fill="#000"/>
      <rect style={px} x="120" y="124" width="6" height="6" fill="#000"/>
      <rect style={px} x="540" y="124" width="6" height="6" fill="#000"/>
      <rect style={px} x="390" y="136" width="24" height="12" fill="#000"/>
      <rect style={px} x="414" y="148" width="24" height="12" fill="#000"/>
      <rect style={px} x="438" y="160" width="18" height="12" fill="#000"/>
      <rect style={px} x="120" y="20" width="420" height="110" fill="#fff"/>
      <rect style={px} x="108" y="32" width="12" height="86" fill="#fff"/>
      <rect style={px} x="540" y="32" width="12" height="86" fill="#fff"/>
      <rect style={px} x="114" y="26" width="6" height="6" fill="#fff"/>
      <rect style={px} x="534" y="26" width="6" height="6" fill="#fff"/>
      <rect style={px} x="114" y="118" width="6" height="6" fill="#fff"/>
      <rect style={px} x="534" y="118" width="6" height="6" fill="#fff"/>
      <rect style={px} x="384" y="130" width="24" height="12" fill="#fff"/>
      <rect style={px} x="408" y="142" width="24" height="12" fill="#fff"/>
      <rect style={px} x="432" y="154" width="18" height="12" fill="#fff"/>
      <rect style={px} x="114" y="14" width="432" height="6" fill="#000"/>
      <rect style={px} x="114" y="130" width="270" height="6" fill="#000"/>
      <rect style={px} x="456" y="130" width="90" height="6" fill="#000"/>
      <rect style={px} x="102" y="26" width="6" height="104" fill="#000"/>
      <rect style={px} x="552" y="26" width="6" height="104" fill="#000"/>
      <rect style={px} x="108" y="20" width="6" height="6" fill="#000"/>
      <rect style={px} x="546" y="20" width="6" height="6" fill="#000"/>
      <rect style={px} x="108" y="130" width="6" height="6" fill="#000"/>
      <rect style={px} x="546" y="130" width="6" height="6" fill="#000"/>
      <rect style={px} x="384" y="130" width="6" height="6" fill="#000"/>
      <rect style={px} x="384" y="136" width="6" height="18" fill="#000"/>
      <rect style={px} x="390" y="136" width="18" height="6" fill="#000"/>
      <rect style={px} x="408" y="148" width="6" height="6" fill="#000"/>
      <rect style={px} x="408" y="142" width="18" height="6" fill="#000"/>
      <rect style={px} x="426" y="154" width="12" height="6" fill="#000"/>
      <rect style={px} x="432" y="154" width="6" height="6" fill="#000"/>
      <rect style={px} x="438" y="160" width="6" height="6" fill="#000"/>
      <rect style={px} x="444" y="160" width="6" height="6" fill="#000"/>
      <rect style={px} x="450" y="154" width="6" height="6" fill="#000"/>
      <text x="340" y="72" textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Pixelify Sans','Courier New',monospace"
        fontSize="28" fontWeight="700" fill="#111">{text}</text>
    </svg>
  )
}

function BubbleLeft({ text }: { text: string }) {
  return (
    <svg className="w-[180px] md:w-[280px]" viewBox="0 0 680 180" xmlns="http://www.w3.org/2000/svg">
      <rect style={px} x="134" y="26" width="420" height="110" fill="#000"/>
      <rect style={px} x="122" y="38" width="12" height="86" fill="#000"/>
      <rect style={px} x="554" y="38" width="12" height="86" fill="#000"/>
      <rect style={px} x="128" y="32" width="6" height="6" fill="#000"/>
      <rect style={px} x="548" y="32" width="6" height="6" fill="#000"/>
      <rect style={px} x="128" y="124" width="6" height="6" fill="#000"/>
      <rect style={px} x="548" y="124" width="6" height="6" fill="#000"/>
      <rect style={px} x="268" y="136" width="24" height="12" fill="#000"/>
      <rect style={px} x="244" y="148" width="24" height="12" fill="#000"/>
      <rect style={px} x="226" y="160" width="18" height="12" fill="#000"/>
      <rect style={px} x="120" y="20" width="420" height="110" fill="#fff"/>
      <rect style={px} x="108" y="32" width="12" height="86" fill="#fff"/>
      <rect style={px} x="540" y="32" width="12" height="86" fill="#fff"/>
      <rect style={px} x="114" y="26" width="6" height="6" fill="#fff"/>
      <rect style={px} x="534" y="26" width="6" height="6" fill="#fff"/>
      <rect style={px} x="114" y="118" width="6" height="6" fill="#fff"/>
      <rect style={px} x="534" y="118" width="6" height="6" fill="#fff"/>
      <rect style={px} x="270" y="130" width="24" height="12" fill="#fff"/>
      <rect style={px} x="246" y="142" width="24" height="12" fill="#fff"/>
      <rect style={px} x="228" y="154" width="18" height="12" fill="#fff"/>
      <rect style={px} x="114" y="14" width="432" height="6" fill="#000"/>
      <rect style={px} x="294" y="130" width="252" height="6" fill="#000"/>
      <rect style={px} x="114" y="130" width="156" height="6" fill="#000"/>
      <rect style={px} x="102" y="26" width="6" height="104" fill="#000"/>
      <rect style={px} x="552" y="26" width="6" height="104" fill="#000"/>
      <rect style={px} x="108" y="20" width="6" height="6" fill="#000"/>
      <rect style={px} x="546" y="20" width="6" height="6" fill="#000"/>
      <rect style={px} x="108" y="130" width="6" height="6" fill="#000"/>
      <rect style={px} x="546" y="130" width="6" height="6" fill="#000"/>
      <rect style={px} x="288" y="130" width="6" height="6" fill="#000"/>
      <rect style={px} x="288" y="136" width="6" height="18" fill="#000"/>
      <rect style={px} x="270" y="136" width="18" height="6" fill="#000"/>
      <rect style={px} x="246" y="148" width="6" height="6" fill="#000"/>
      <rect style={px} x="252" y="142" width="18" height="6" fill="#000"/>
      <rect style={px} x="240" y="154" width="12" height="6" fill="#000"/>
      <rect style={px} x="228" y="154" width="6" height="6" fill="#000"/>
      <rect style={px} x="222" y="160" width="6" height="6" fill="#000"/>
      <rect style={px} x="228" y="160" width="6" height="6" fill="#000"/>
      <rect style={px} x="222" y="154" width="6" height="6" fill="#000"/>
      <text x="340" y="72" textAnchor="middle" dominantBaseline="middle"
        fontFamily="'Pixelify Sans','Courier New',monospace"
        fontSize="28" fontWeight="700" fill="#111">{text}</text>
    </svg>
  )
}

const POSITIONS = [
  { side: 'left',  topOffset: '-160px' },
  { side: 'right', topOffset:  '-120px' },
  { side: 'left',  topOffset:  '-50px' },
  { side: 'right', topOffset:   '-40px' },
]

const VIDEO_HALF = 0 
const BUBBLE_W   = 220

export default function Greetings() {
  const videoRef      = useRef<HTMLVideoElement>(null)
  const containerRef  = useRef<HTMLDivElement>(null)
  const pinWrapperRef = useRef<HTMLDivElement>(null)
  const b0 = useRef<HTMLDivElement>(null)
  const b1 = useRef<HTMLDivElement>(null)
  const b2 = useRef<HTMLDivElement>(null)
  const b3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video      = videoRef.current
    const container  = containerRef.current
    const pinWrapper = pinWrapperRef.current
    const bubbles    = [b0.current, b1.current, b2.current, b3.current]

    if (!video || !container || !pinWrapper || bubbles.some((b) => !b)) return

    let st: ScrollTrigger | null = null
    let animation: gsap.core.Tween | null = null
    let textTimeline: gsap.core.Timeline | null = null

    const initAnimation = () => {
      const duration = video.duration || 5

      animation = gsap.to(video, {
        scale: 2.1,
        y: 200,
        ease: 'none',
        paused: true,
      })

      textTimeline = gsap.timeline({ paused: true })

      bubbles.forEach((el) => {
        textTimeline!
          .fromTo(el,
            { opacity: 0, y: 12, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.12 }
          )
          .to(el,
            { opacity: 0, y: -12, scale: 0.95, ease: 'power2.in', duration: 0.12 },
            '+=0.6'
          )
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
          if (textTimeline) {
            textTimeline.progress(self.progress)
          }
        },
      })
    }

    if (video.readyState >= 2) {
      initAnimation()
    } else {
      video.addEventListener('loadedmetadata', initAnimation, { once: true })
    }

    return () => {
      video?.removeEventListener('loadedmetadata', initAnimation)
      if (st)           { st.kill(true);       st = null }
      if (animation)    { animation.kill();    animation = null }
      if (textTimeline) { textTimeline.kill(); textTimeline = null }
      ScrollTrigger.refresh()
    }
  }, [])

  const refs = [b0, b1, b2, b3]

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-black">
      <div ref={pinWrapperRef} className="relative w-full h-screen">
        <div className="absolute inset-0 bg-[url('/fondodiamejor.png')] h-screen bg-cover bg-center" />

        <div className="absolute inset-0 flex items-center justify-center">

          {/* Video central */}
          <video
            ref={videoRef}
            src="/Completo.webm"
            style={{ height: 200, width: 'auto', zIndex: 10, position: 'relative' }}
            muted
            playsInline
            preload="metadata"
          />

          {/* Los 4 bocadillos posicionados en cascada */}
          {PHRASES.map((p, i) => {
            const pos = POSITIONS[i]
            const isLeft = pos.side === 'left'
            return (
              <div
                key={i}
                ref={refs[i]}
                style={{
                  position: 'absolute',
                  top: `calc(50% + ${pos.topOffset})`,
                  ...(isLeft
                    ? { right: `calc(50% + ${VIDEO_HALF}px)` }
                    : { left:  `calc(50% + ${VIDEO_HALF}px)` }
                  ),
                  width: BUBBLE_W,
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              >
                {isLeft
                  ? <BubbleRight text={p.text} />
                  : <BubbleLeft  text={p.text} />
                }
              </div>
            )
          })}

        </div>
      </div>
    </section>
  )
}