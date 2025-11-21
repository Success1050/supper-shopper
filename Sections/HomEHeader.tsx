"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const HomeHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="px-4 md:px-8 lg:px-24 xl:px-[100px] py-6">
      <nav className="flex items-center justify-between max-w-screen-xl mx-auto h-fit">
        {/* Logo */}
        <Link href="/">
          <img src="/images/logo.png" alt="" className="w-[120px]" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-[58px] text-white">
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
        <div className="hidden lg:flex items-center space-x-4 text-white font-bold">
          <Link
            href="/signup"
            className="text-white font-bold hover:text-[#2563EB] transition-colors"
          >
            Registration
          </Link>
          <Link
            href="/login"
            className="bg-[#2563EB] text-white px-6 py-2 rounded-[30px] font-bold hover:bg-blue-700 transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile_btn lg:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile">
          <div className="mobile_menu">
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
            <div className="auth_div">
              <Link
                href="/signup"
                className="text-white font-bold hover:text-[#2563EB] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
              <Link
                href="/login"
                className="bg-[#2563EB] text-white px-6 py-2 rounded-[30px] font-bold hover:bg-blue-700 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
          <div className="close">
            <button onClick={toggleMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeHeader;
