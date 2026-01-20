import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/profile.jpg"
            alt="Tesfaye"
            width={50}
            height={50}
            className="rounded-full border-2 border-yellow-400"
          />
          <span className="text-xl font-semibold">Tesfaye</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-lg">
          <NavItem href="/projects" label="Projects" activePath={pathname} />
          <NavItem href="/about" label="About" activePath={pathname} />
          <NavItem href="#contact" label="Contact" activePath={pathname} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu (Slide-In) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex justify-end h-fit`}
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-gray-900 text-white w-3/4 max-w-xs h-full flex flex-col te shadow-lg"
          
        >
          <NavItem href="#projects" label="Projects" activePath={pathname} />
          <NavItem href="#about" label="About" activePath={pathname} />
          <NavItem href="#contact" label="Contact" activePath={pathname} />

          {/* Close Button */}
          <button
            className="text-gray-400 hover:text-white hover:bg-red-700 align-middle text-lg mt-auto pb-6"
            onClick={() => setIsOpen(false)}
          >
             <span>✖</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

// Reusable Navigation Item Component with Active Styling
const NavItem = ({ href, label, activePath }: { href: string; label: string; activePath: string }) => (
  <Link
    href={href}
    className={`py-2 rounded-md transition duration-300 ${
      activePath === href ? "bg-yellow-500 text-gray-900 font-semibold" : "hover:bg-slate-400"
    }`}
  >
    {label}
  </Link>
);
