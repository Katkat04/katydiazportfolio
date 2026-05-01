"use client"
import Image from "next/image"
import ContactForm from "./ContactForm"

const ROWS = [
  { count: 10, offset: false },
  { count: 9, offset: true  },
  { count: 10, offset: false },
  { count: 9, offset: true  },
]

function DollGrid({ side }: { side: "left" | "right" }) {
  const src = side === "left" ? "/cumbia1.png" : "/cumbia2.png"
  const cls = side === "left" ? "animate-doll-left" : "animate-doll-right"

  return (
    <div className="flex flex-col gap-3">
      {ROWS.map((row, ri) => (
        <div 
          key={ri} 
          className="flex gap-2" 
          style={{ 
  marginRight: side === "left" && row.offset ? "35px" : "0",
  marginLeft: side === "right" && row.offset ? "35px" : "0",
  flexDirection: side === "left" ? "row-reverse" : "row"
}}
        >
          {Array.from({ length: row.count }).map((_, i) => (
            <div key={i} className={`${cls} shrink-0`}>
              <Image src={src} alt="Cumbia" width={105} height={105} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default function Ending() {
  return (
    <footer className="w-full relative flex flex-col md:flex-row items-center justify-center gap-6 bg-[#e4b779] text-black overflow-hidden">
      
      {/* Grid izquierdo: anclado a la izquierda, desborda hacia afuera */}
      <div className="flex-1 flex justify-start overflow-hidden">
        <DollGrid side="left" />
      </div>

      {/* Centro: nunca se comprime */}
      <div className="flex flex-col items-center text-center shrink-0 min-w-[330px]">
        <p className="font-bold text-[48px] leading-snug">¡Let's work<br />together!</p>
        
      </div>

      {/* Grid derecho: anclado a la derecha, desborda hacia afuera */}
      <div className="flex-1 flex justify-end overflow-hidden">
        <DollGrid side="right" />
      </div>

    </footer>
  )
}