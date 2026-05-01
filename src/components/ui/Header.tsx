"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full fixed left-0 right-0 z-[1000] flex justify-center">
      <div className="w-full max-w-[550px] mt-4 mx-4 rounded-2xl text-white bg-black/10 backdrop-blur-md border border-white/20 px-4 py-2 flex flex-row items-center justify-center md:justify-between">
        <Link href="/" className="block" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <Image
            src="/KDB_LogoPrincipal_FullColor.svg"
            alt="Logo"
            width={100}
            height={75}
            className="w-[70px] h-auto md:w-[100px]"
          />
        </Link>

        <nav className="hidden md:block mix-blend-difference text-white">
          <ul className="flex space-x-4">
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}