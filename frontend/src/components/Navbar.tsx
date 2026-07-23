import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/projects", internal: true },
  { label: "Experience", href: "/experience", internal: true },
  { label: "Contact", href: "/#contact" },
];

interface NavbarProps {
  theme: "light" | "dark";
  onToggleTheme: () => void;
}

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 z-50 transition-colors duration-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3.5">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
          aria-label="Brian Kimathi Home"
        >
          <Logo />
        </Link>

        {/* Right side links & Theme toggle */}
        <div className="flex items-center gap-6">
          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600 dark:text-gray-300">
            {navLinks.map((link) =>
              link.internal ? (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60 transition-colors"
            aria-label="Toggle theme"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Hamburger button */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-1 text-gray-600 dark:text-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-200 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition-all duration-200 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <ul className="flex flex-col px-6 py-4 gap-4 text-sm font-medium text-gray-600 dark:text-gray-300">
            {navLinks.map((link) =>
              link.internal ? (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="block py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ) : (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block py-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
