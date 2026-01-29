'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Greetings(){
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const video = videoRef.current
        const container = containerRef.current
        
        if (!video || !container) return

        // Esperar a que el video cargue sus metadatos
        video.addEventListener('loadedmetadata', () => {
            console.log('Video cargado, duración:', video.duration)
            
            // Configurar el video
            video.pause()
            video.currentTime = 0

            // Crear la animación con ScrollTrigger
            ScrollTrigger.create({
                trigger: container,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1,
                markers: true, // Para ver los puntos de inicio/fin (quítalo después)
                onUpdate: (self) => {
                    console.log('Progreso:', self.progress)
                    // Controlar el video según el progreso del scroll
                    if (video.duration) {
                        video.currentTime = video.duration * self.progress
                    }
                }
            })

            // Animación de escala del video
            gsap.fromTo(videoRef.current, 
                {
                    scale: 1, // Escala inicial
                },
                {
                    scale: 2.5, // Escala final
                    scrollTrigger: {
                        trigger: container,
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 1,
                        markers: true
                    }
                }
            )
        })

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return(
        <section 
            ref={containerRef}
            className="min-h-[300vh] relative"
        >
            {/* Fondo fijo */}
            <div className="fixed top-0 left-0 w-full h-screen lg:bg-[url('/fondo.jpg')] bg-cover bg-left-top -z-10" />
            
            {/* Contenedor del video con sticky */}
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <video
                    ref={videoRef}
                    src="/supa2.webm"
                    className="w-auto h-auto"
                    style={{ maxWidth: '80%', maxHeight: '80%' }}
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
        </section>
    )
}