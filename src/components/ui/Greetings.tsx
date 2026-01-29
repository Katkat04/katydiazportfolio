'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Greetings(){
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const svgContainerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const video = videoRef.current
        const container = containerRef.current
        const svg = svgRef.current
        
        if (!video || !container || !svg) return

        const initAnimations = () => {
            console.log('Iniciando animaciones...')
            
            // Configurar el video
            video.pause()
            video.currentTime = 0

            // Configurar paths del SVG
            const paths = svg.querySelectorAll('path')
            console.log('Paths encontrados:', paths.length)
            
            paths.forEach(path => {
                const originalFill = path.getAttribute('fill') || 'black'
                path.setAttribute('data-original-fill', originalFill)
                
                path.style.stroke = 'currentColor'
                path.style.strokeWidth = '2'
                path.style.fill = 'transparent'
                
                const length = (path as SVGPathElement).getTotalLength()
                path.style.strokeDasharray = length.toString()
                path.style.strokeDashoffset = length.toString()
            })

            // Animación del video con scroll - MÁS LENTO
            ScrollTrigger.create({
                trigger: container,
                start: 'top top',
                end: 'bottom top',  // ← CAMBIO: ahora usa toda la altura del container
                scrub: 1,
                onUpdate: (self) => {
                    if (video.duration) {
                        video.currentTime = video.duration * self.progress
                    }
                }
            })

            // Animación de escala del video - MÁS LENTO
            gsap.fromTo(videoRef.current, 
                {
                    scale: 1,
                },
                {
                    scale: 2.5,
                    scrollTrigger: {
                        trigger: container,
                        start: 'top top',
                        end: 'bottom top',  // ← CAMBIO: ahora usa toda la altura del container
                        scrub: 1,
                    }
                }
            )

            // Timeline para animación del SVG
            const svgTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: svgContainerRef.current,
                    start: 'top center',  // Empieza cuando el SVG llega al centro
                    end: '+=800',  // ← CAMBIO: más tiempo para dibujar (era 500)
                    scrub: true,
                    pin: true,
                    pinSpacing: false,  // ← CAMBIO: sin espacio extra para scroll más fluido
                    anticipatePin: 1
                }
            })
            
            // Paso 1: Animar el trazado (stroke) - MÁS LENTO
            svgTimeline.to(paths, {
                strokeDashoffset: 0,
                duration: 4,  // ← CAMBIO: más lento (era 3)
                stagger: 0.3,  // ← CAMBIO: más delay entre paths (era 0.2)
                ease: "power2.out"
            })
            // Paso 2: Rellenar después del trazado
            .to(paths, {
                fill: (index, target) => target.getAttribute('data-original-fill'),
                duration: 0.7,  // ← CAMBIO: más lento (era 0.5)
                stagger: 0.15,  // ← CAMBIO: más delay (era 0.1)
                ease: "power2.in"
            }, "-=2.5")  // ← CAMBIO: empieza un poco más tarde
            // Paso 3: Desvanecer el stroke
            .to(paths, {
                stroke: 'transparent',
                duration: 0.5,  // ← CAMBIO: más lento (era 0.3)
                stagger: 0.08  // ← CAMBIO: más delay (era 0.05)
            })

            console.log('Animaciones configuradas')
        }

        if (video.readyState >= 2) {
            initAnimations()
        } else {
            video.addEventListener('loadedmetadata', initAnimations)
            video.addEventListener('canplay', initAnimations)
        }

        const timeout = setTimeout(initAnimations, 100)

        return () => {
            clearTimeout(timeout)
            video.removeEventListener('loadedmetadata', initAnimations)
            video.removeEventListener('canplay', initAnimations)
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return(
        <section 
            ref={containerRef}
            className="min-h-[300vh] relative"  // ← CAMBIO: más altura (era 200vh)
        >
            {/* Fondo fijo */}
            <div className="fixed top-0 left-0 w-full h-screen bg-[url('/fondo.jpg')] bg-cover bg-left-top -z-10" />
            
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

            {/* Contenedor del SVG */}
            <div 
                ref={svgContainerRef}
                className="h-screen flex items-center justify-center"
            >
                <div className="relative w-[610px] h-[543px]">
                    <svg 
                        ref={svgRef}
                        width="100%" 
                        height="100%" 
                        viewBox="0 0 915 843" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-black"
                    >
                        <path d="M81.0013 53.7612C84.3487 51.0005 87.1178 46.4117 89.0127 40.3656C89.2432 38.674 88.1668 37.2131 86.5524 36.9055C84.7839 36.7519 83.4767 37.7514 83.1694 39.2123C83.0036 39.7208 82.8249 40.2152 82.6381 40.6965C82.7027 40.6766 82.7787 40.6833 82.8587 40.735C82.9974 40.8248 83.1484 41.0502 83.22 41.3508C83.2914 41.6514 83.2835 42.0279 83.1708 42.314C83.0581 42.6001 82.8411 42.7961 82.6635 42.8914C82.5531 42.9507 82.458 42.9712 82.3821 42.9745C82.5413 43.3697 82.8506 43.7553 83.3999 44.1328C85.1978 51.998 89.185 56.6518 94.9349 56.8861C96.9457 56.9675 98.2435 56.6976 100.078 55.7854C104.48 53.5932 108.06 48.4243 111.026 40.3721C111.497 39.094 111.196 38.1124 109.868 37.1426C108.352 36.0366 106.231 36.7567 105.544 38.6804C103.073 45.5982 99.6681 50.0771 96.2681 50.9703C95.9752 51.0251 95.6839 51.0528 95.3942 51.0528C92.165 51.0528 89.7815 47.2853 88.782 41.0575C95.471 28.2944 97.9314 20.6057 97.9314 12.84C97.9314 4.61311 95.7017 0 91.1656 0C84.7839 0 82.3235 10.9179 82.3235 33.0614C82.3235 34.9085 82.4052 36.634 82.5383 38.2956C82.6316 39.4671 82.7069 40.1108 82.3078 41.298C82.0911 41.9446 81.8961 42.4779 81.6129 43.0989C80.6084 45.3 79.3838 47.1016 78.0764 48.4166C77.3977 49.0989 76.481 49.9563 75.6392 50.4118C74.7602 50.8881 73.8774 51.1362 73.011 51.1362C69.7819 51.1362 67.3984 47.3686 66.3989 41.1408C73.0879 28.3778 75.5483 20.689 75.5483 12.9233C75.5483 4.69645 73.3187 0.0833354 68.7824 0.0833354C62.4007 0.0833354 59.9404 11.0012 59.9404 33.1447C59.9404 34.9918 60.022 36.7173 60.1551 38.379C60.2486 39.5505 60.3237 40.1942 59.9247 41.3813C59.708 42.0279 59.513 42.5612 59.2297 43.1823C57.0015 48.0647 53.691 50.9823 50.791 50.9823C48.351 50.9823 46.2866 49.4269 45.2242 45.8689C45.2085 45.8032 45.1893 45.7369 45.1713 45.6715C44.7085 43.9835 44.8475 43.5022 46.1513 42.3557C49.6701 39.2646 51.4828 35.8173 51.4828 32.0683C51.4828 27.9932 49.33 25.4559 45.7164 25.4559C38.5151 25.4559 39.6348 36.5067 38.4684 40.8341C38.3687 41.202 38.2069 41.7468 38.0973 42.1629C36.5331 47.1497 33.9989 50.9823 30.7745 50.9823C29.5443 50.9823 28.6987 50.6748 28.0837 49.9059C26.6997 48.4451 26.2383 45.3694 26.7766 41.2946C28.186 31.1455 26.5716 25.5328 20.19 25.5328C14.9616 25.5328 11.8093 30.5305 8.65682 36.4508C8.11871 37.4502 7.50352 38.6804 6.88857 39.9106C6.81164 38.9111 6.73471 37.8348 6.73471 36.9122V36.7584C11.8093 28.8389 16.4225 19.0743 16.4225 10.9244C16.4225 5.54243 14.4235 1.15971 9.88697 1.15971C3.42867 1.15971 0.968299 11.6934 0.968299 34.3749C0.968299 35.9894 0.968299 37.0657 1.04523 37.9116L0.353105 38.8342C-0.184999 39.6799 -0.108071 40.8332 0.583812 41.5253C0.73759 41.6792 0.968298 41.8327 1.19901 41.9095C1.32289 44.8831 1.59671 47.857 1.93953 50.4687C2.25943 52.9084 1.36793 57.227 5.47467 56.8114C8.78656 56.4781 7.83015 53.0174 8.20318 50.4871C8.90035 45.7652 10.856 41.7714 12.9626 37.8348C14.3234 35.2919 15.8008 33.3894 17.015 32.3301C18.3487 31.167 20.4993 30.8107 21.2755 32.7014C21.824 34.0379 21.5851 36.5008 20.9587 40.6025C20.1601 45.8301 21.0742 50.7516 23.5472 53.9039C25.3157 55.7493 27.853 56.8257 30.7745 56.8257C36.5441 56.8257 41.1745 51.6303 43.5032 44.5953C43.459 44.465 43.4224 44.3314 43.3958 44.1946C43.238 43.3864 43.4302 42.4876 43.6508 41.8942C43.6679 41.8486 43.685 41.8047 43.7024 41.7627C43.3416 40.9054 42.5596 40.2454 41.5644 40.0644C40.7056 39.8835 39.8736 40.1016 39.2086 40.624C39.2975 40.8838 39.3679 41.1964 39.3467 41.6047C39.3235 42.0494 39.1915 42.6076 39.0539 42.9258C38.9667 43.1274 38.8769 43.2332 38.7832 43.2866C39.6448 53.313 44.4026 56.8257 50.791 56.8257C57.6338 56.8257 63.4002 50.7516 66.6296 40.4489C66.8601 38.7574 65.7837 37.2964 64.1692 36.9888C62.4007 36.8353 61.0937 37.8348 60.7863 39.2956C60.6205 39.8041 60.4418 40.2985 60.255 40.7798C60.3196 40.7599 60.3956 40.7667 60.4756 40.8184C60.6143 40.9081 60.7653 41.1335 60.8369 41.4342C60.9082 41.7348 60.9004 42.1112 60.7877 42.3973C60.675 42.6834 60.4579 42.8794 60.2804 42.9748C60.1699 43.0341 60.0748 43.0545 59.9991 43.0578C60.1582 43.453 60.4675 43.8386 61.0167 44.2161C62.8621 52.2895 67.0138 56.9795 73.011 56.9795C75.9194 56.9795 78.5809 55.9034 81.0013 53.7901V53.7612ZM141.468 36.7584C140.699 35.9894 139.623 35.9894 139.546 35.9894C138.294 35.9894 137.216 36.8649 136.706 37.9615C135.724 40.0701 134.171 41.9095 131.549 41.9095H130.857C131.165 40.6025 131.319 39.5261 131.319 38.8342C131.319 32.145 129.166 27.5318 125.475 27.5318C125.014 27.5318 124.553 27.6087 124.168 27.6856H124.092C123.322 27.0706 121.477 26.6861 119.632 26.6861C115.788 26.6861 111.867 28.6851 109.175 31.9145C106.561 34.7591 105.023 38.7574 105.023 42.6786C105.023 46.9842 106.1 50.444 108.253 52.8275C110.329 55.2109 113.404 56.5181 116.941 56.5181C120.708 56.5181 124.553 54.2884 127.244 50.5978C128.013 49.5215 128.705 48.2912 129.243 46.9072C129.935 47.0611 130.704 47.1379 131.549 47.1379C136.778 47.1379 140.007 44.6776 142.006 40.3721C142.698 38.9881 142.467 37.7579 141.468 36.7584ZM120.478 33.6828C120.478 38.3728 121.938 42.2941 124.706 44.6776C122.631 48.2912 119.401 50.6748 116.941 50.6748C115.096 50.6748 113.712 50.1367 112.635 48.9831C111.482 47.5994 110.867 45.6002 110.867 42.6786C110.867 40.1413 111.79 37.7579 113.558 35.682C115.102 33.9568 117.245 32.4363 119.632 32.5295C120.349 32.5574 120.478 32.5546 120.478 33.6828ZM125.014 35.9894C125.014 35.1437 125.168 34.6054 125.783 34.5287C126.398 34.5287 126.782 35.5282 126.782 36.9888C126.782 37.8348 126.705 38.6804 126.552 39.5261C125.629 38.4497 125.014 37.1426 125.014 35.9894ZM9.88697 7.00305C10.4253 7.00305 10.5792 8.15634 10.5792 9.84799C10.5792 15.922 9.19516 21.9192 6.88857 27.4549C7.42691 15.0764 8.96446 7.00305 9.88697 7.00305ZM45.9471 31.2992C46.3316 31.2992 46.562 31.6069 46.562 32.2988C46.562 34.2211 45.9471 36.1431 44.4861 38.1423C44.64 32.2218 45.4857 31.2992 45.9471 31.2992ZM68.7824 5.92668C69.3974 5.92668 69.705 6.46502 69.705 10.6167C69.705 16.6908 68.5517 22.1499 65.7837 28.8389C66.0913 8.9254 68.0134 5.92668 68.7824 5.92668ZM91.1656 5.84334C91.7805 5.84334 92.0881 6.38168 92.0881 10.5334C92.0881 16.6074 90.9348 22.0665 88.1668 28.7555C88.4744 8.84206 90.3965 5.84334 91.1656 5.84334Z" fill="#2D2104"/>
                    </svg>
                </div>
            </div>
        </section>
    )
}