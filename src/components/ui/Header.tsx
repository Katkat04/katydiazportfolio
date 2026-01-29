export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-black text-white">
      <h1 className="text-lg font-bold">My Portfolio</h1>
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
    </header>
  );
}