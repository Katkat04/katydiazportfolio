'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

// Cargar GSAP dinámicamente solo en cliente
let gsapPromise: Promise<any> | null = null
let scrollTriggerPromise: Promise<any> | null = null

const loadGSAP = () => {
  if (!gsapPromise) {
    gsapPromise = import('gsap').then(mod => mod.gsap || mod.default)
  }
  return gsapPromise
}

const loadScrollTrigger = () => {
  if (!scrollTriggerPromise) {
    scrollTriggerPromise = import('gsap/ScrollTrigger').then(mod => mod.ScrollTrigger || mod.default)
  }
  return scrollTriggerPromise
}

export default function Greetings() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgContainerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  
  // Estados para controlar la inicialización
  const [isInitialized, setIsInitialized] = useState(false)
  
  // Refs para controlar el estado
  const isUnmountingRef = useRef(false)
  const scrollTriggerInstanceRef = useRef<any>(null)
  const animationTimelineRef = useRef<any>(null)

  // PATCH para el error removeChild - SOLUCIÓN TYPESCRIPT CORRECTA
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Guardar referencia original
    const originalRemoveChild = Node.prototype.removeChild
    
    // Sobrescribir con tipo correcto
    Node.prototype.removeChild = function<T extends Node>(child: T): T {
      try {
        return originalRemoveChild.call(this, child) as T
      } catch (error) {
        if (error instanceof DOMException && error.name === 'NotFoundError') {
          console.warn('Silenced removeChild error: child not in parent')
          return child
        }
        throw error
      }
    }
    
    return () => {
      // Restaurar original al desmontar
      Node.prototype.removeChild = originalRemoveChild
    }
  }, [])

  // Función de limpieza agresiva
  const cleanupGSAP = useCallback(async () => {
    if (isUnmountingRef.current) return
    
    try {
      const [gsap, ScrollTrigger] = await Promise.all([
        loadGSAP(),
        loadScrollTrigger()
      ])
      
      // 1. Matar timeline específica
      if (animationTimelineRef.current) {
        try {
          animationTimelineRef.current.kill()
          animationTimelineRef.current = null
        } catch (e) {
          // Ignorar
        }
      }
      
      // 2. Matar ScrollTrigger específico
      if (scrollTriggerInstanceRef.current) {
        try {
          if (!scrollTriggerInstanceRef.current.killed) {
            scrollTriggerInstanceRef.current.kill(true)
          }
          scrollTriggerInstanceRef.current = null
        } catch (e) {
          // Ignorar
        }
      }
      
      // 3. Matar TODOS los ScrollTriggers adicionales
      const allTriggers = ScrollTrigger.getAll()
      for (let i = allTriggers.length - 1; i >= 0; i--) {
        try {
          if (!allTriggers[i].killed) {
            allTriggers[i].kill(true)
          }
        } catch (e) {
          // Ignorar
        }
      }
      
      // 4. Limpiar estilos de elementos específicos
      const elementsToClean = [
        containerRef.current,
        svgContainerRef.current,
        videoRef.current,
        svgRef.current
      ]
      
      elementsToClean.forEach(element => {
        if (element) {
          gsap.set(element, { clearProps: 'all' })
          
          // Limpieza manual adicional
          if (element instanceof HTMLElement || element instanceof SVGElement) {
            element.style.transform = ''
            element.style.position = ''
            element.style.width = ''
            element.style.height = ''
            element.style.top = ''
            element.style.left = ''
            element.style.margin = ''
            element.style.padding = ''
          }
        }
      })
      
      // 5. Limpiar paths del SVG
      if (svgRef.current) {
        const paths = svgRef.current.querySelectorAll('path')
        paths.forEach(path => {
          gsap.set(path, { clearProps: 'all' })
          path.style.strokeDasharray = ''
          path.style.strokeDashoffset = ''
        })
      }
      
    } catch (error) {
      // Ignorar errores en limpieza
    }
  }, [])

  // Efecto principal - Cargar e inicializar GSAP
  useEffect(() => {
    let mounted = true
    isUnmountingRef.current = false
    
    const initAnimations = async () => {
      if (!mounted) return
      
      try {
        // Limpieza previa
        await cleanupGSAP()
        
        const [gsap, ScrollTrigger] = await Promise.all([
          loadGSAP(),
          loadScrollTrigger()
        ])
        
        if (!mounted) return
        
        gsap.registerPlugin(ScrollTrigger)
        
        const video = videoRef.current
        const container = containerRef.current
        const svg = svgRef.current
        const svgContainer = svgContainerRef.current

        if (!video || !container || !svg || !svgContainer || !mounted) {
          return
        }

        // MARK: 1. PREPARAR SVG
        const paths = svg.querySelectorAll('path')
        paths.forEach(path => {
          const length = (path as SVGPathElement).getTotalLength()
          const originalFill = path.getAttribute('fill') || 'white'
          path.setAttribute('data-original-fill', originalFill)

          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            fill: 'transparent',
            stroke: 'white',
            strokeWidth: 2,
          })
        })

        // MARK: 2. CONFIGURACIÓN DEL VIDEO
        const stopAtSeconds = 2
        
        const initVideoTweens = (tl: any) => {
          const totalDuration = video.duration
          if (!totalDuration || isNaN(totalDuration)) return

          const stopProgress = Math.min(stopAtSeconds / totalDuration, 1)

          tl.to(
            video,
            {
              scale: 2.1,
              y: () => window.innerHeight * 0.25,
              ease: 'none',
              transformOrigin: 'center center',
              duration: stopProgress,
              onUpdate: function () {
                if (video.duration && this.progress && !isUnmountingRef.current) {
                  const t = stopAtSeconds * this.progress()
                  if (t <= video.duration) {
                    video.currentTime = t
                  }
                }
              },
            },
            0,
          )

          tl.to(
            video,
            {
              scale: 2.1,
              ease: 'none',
              transformOrigin: 'center center',
              duration: 1 - stopProgress,
              onUpdate: function () {
                if (video.duration && this.progress && !isUnmountingRef.current) {
                  const p = this.progress()
                  const t = stopAtSeconds + (totalDuration - stopAtSeconds) * p
                  if (t <= video.duration) {
                    video.currentTime = t
                  }
                }
              },
            },
            '>',
          )
        }

        // MARK: 3. CREAR ANIMACIONES CON CONFIGURACIÓN SEGURA
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=50%',
            pin: true,
            scrub: 2,
            markers: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
            // Callbacks de seguridad
            onRefreshInit: () => !isUnmountingRef.current && mounted,
            onRefresh: function() {
              if (isUnmountingRef.current || !mounted) {
                this.kill()
                return false
              }
              return true
            }
          }
        })

        // Guardar referencias
        animationTimelineRef.current = tl
        scrollTriggerInstanceRef.current = tl.scrollTrigger

        // Animaciones SVG
        tl.to(
          paths,
          {
            strokeDashoffset: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          0,
        )

        tl.to(
          paths,
          {
            fill: (i: number, target: any) => target.getAttribute('data-original-fill'),
            stroke: 'white',
            duration: 0.3,
          },
          0.4,
        )

        tl.to(
          svgContainer,
          {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.2,
          },
          0.8,
        )

        // Inicializar video
        if (video.readyState >= 1 && video.duration) {
          initVideoTweens(tl)
        } else {
          const handleLoad = () => {
            if (!mounted || isUnmountingRef.current) return
            initVideoTweens(tl)
            video.removeEventListener('loadedmetadata', handleLoad)
          }
          video.addEventListener('loadedmetadata', handleLoad)
        }

        setIsInitialized(true)

      } catch (error) {
        console.error('Error initializing animations:', error)
      }
    }

    // Pequeño delay para estabilizar el DOM
    const timeoutId = setTimeout(() => {
      initAnimations()
    }, 150)

    // CLEANUP - ORDEN CRÍTICO
    return () => {
      mounted = false
      isUnmountingRef.current = true
      clearTimeout(timeoutId)
      
      // 1. Limpieza inmediata de estilos (síncrona)
      const cleanupStyles = () => {
        const elements = [
          containerRef.current,
          svgContainerRef.current,
          videoRef.current
        ]
        
        elements.forEach(element => {
          if (element && element instanceof HTMLElement) {
            // Remover todas las transformaciones y posiciones
            element.style.cssText = element.style.cssText
              .replace(/transform[^;]*;?/g, '')
              .replace(/position[^;]*;?/g, '')
              .replace(/(top|left|right|bottom)[^;]*;?/g, '')
              .replace(/(width|height)[^;]*;?/g, '')
              .replace(/(margin|padding)[^;]*;?/g, '')
          }
        })
        
        // Limpiar paths del SVG
        if (svgRef.current) {
          const paths = svgRef.current.querySelectorAll('path')
          paths.forEach(path => {
            path.style.strokeDasharray = ''
            path.style.strokeDashoffset = ''
            path.style.stroke = ''
            path.style.strokeWidth = ''
          })
        }
      }
      
      cleanupStyles()
      
      // 2. Limpieza asíncrona de GSAP (después de que React termine)
      const cleanupAsync = () => {
        requestAnimationFrame(() => {
          // Primero en el próximo frame
          cleanupGSAP()
          
          // Luego después de 100ms por si acaso
          setTimeout(() => {
            cleanupGSAP()
          }, 100)
        })
      }
      
      cleanupAsync()
    }
  }, [cleanupGSAP])

  // Si el componente se desmonta, forzar limpieza final
  useEffect(() => {
    return () => {
      isUnmountingRef.current = true
      cleanupGSAP()
    }
  }, [cleanupGSAP])

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
      data-gsap-component="greetings"
    >
      <div className="absolute inset-0 bg-[url('/fondodiamejor.png')] h-screen bg-cover bg-center" />

      <div className="absolute top-[250] h-[50px] inset-0 flex items-center justify-center z-20">
        <video
          ref={videoRef}
          src="/Completo.webm"
          className="w-auto h-[200px] transition-opacity duration-500"
          muted
          playsInline
          preload="metadata"
        />
      </div>

      <div
        ref={svgContainerRef}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
        style={{ opacity: isInitialized ? 1 : 0 }}
      >
        <div className="w-[410px] h-[543px]">
          <svg 
            ref={svgRef} 
            width="100%" 
            height="100%" 
            viewBox="0 0 915 843" 
            fill="none" 
            className="text-white"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* tus paths aquí */}
          </svg>
        </div>
      </div>
    </section>
  )
}