import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full mx-auto flex justify-center p-4 bg-transparent sticky top-0 z-50 text-white">
      <div className="w-full max-w-[1142px] flex flex-row items-center justify-between">
        <Link href="/">
          <Image src="/KDB_LogoPrincipal_FullColor.svg" alt="Logo" width={50} height={50} />
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:underline">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}