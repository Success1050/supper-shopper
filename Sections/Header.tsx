"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="px-4 md:px-8 lg:px-24 xl:px-[100px] py-6">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto h-fit">
        {/* Logo */}
        <Link href="/">
          <img src="/images/gbu.png" alt="" className="w-[120px]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-[58px] text-[#555555]">
          <Link
            href="/"
            className="text-white font-bold hover:text-[#2563EB] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-white font-bold hover:text-[#2563EB] transition-colors"
          >
            About us
          </Link>
          <Link
            href="/how-it-works"
            className="text-white font-bold hover:text-[#2563EB] transition-colors"
          >
            How it works
          </Link>
          <Link
            href="/faq"
            className="text-white font-bold hover:text-[#2563EB] transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-white font-bold hover:text-[#2563EB] transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center space-x-4 text-[#555555] font-bold">
          <Link
            href="/signup"
            className="text-white font-bold hover:text-[#2563EB] transition-colors"
          >
            Registration
          </Link>
          <Link
            href="/login"
            className="bg-[#2563EB] text-[#555555] px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <h3 className="text-white">Login</h3>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-[#555555]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden top-0 fixed left-0 right-0 bg-white shadow-lg z-50 border-t transition-all duration-1000 ease-in">
          <div className="flex flex-col space-y-4 p-6">
            <Link
              href="/"
              className="text-white font-bold hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="text-white font-bold hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/subscription"
              className="text-white font-bold hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscription Plan
            </Link>
            <Link
              href="/affiliate"
              className="text-white font-bold hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Affiliate Program
            </Link>
            <Link
              href="/faq"
              className="text-white font-bold hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-white font-bold hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="flex flex-col space-y-3 pt-4 border-t">
              <Link
                href="/signup"
                className="text-white font-bold hover:text-[#2563EB] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="login text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 transition-all duration-1000 ease-out">
            <button onClick={toggleMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
