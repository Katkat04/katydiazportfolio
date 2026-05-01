export default function Footer() {
  return (
    <footer className="bg-[#000000] text-white py-4">
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-between px-8">
        <p className="text-center">
          &copy; {new Date().getFullYear()} Katy Díaz Beltrán.
        </p>
        <p> Made with so much love.</p>
        <nav>
            <ul className="flex gap-4 justify-center md:justify-end">
                <li>
                    <a href="#about" className="text-[#ffd509] underline">About</a>
                </li>
                <li>
                    <a href="#projects" className="text-[#ffd509] underline">Projects</a>
                </li>
                <li>
                    <a href="#contact" className="text-[#ffd509] underline">Contact</a>
                </li>
            </ul>
        </nav>
      </div>
    </footer>
  );
}