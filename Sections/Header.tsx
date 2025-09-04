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
    <header className="header">
      <nav>
        {/* Logo */}
        <div className="logo">
          <Link href="/">
            <h2 className="text-[#2563EB] font-bold text-xl">SUPER SHOPPER</h2>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="menu_list">
          <Link
            href="/"
            className="text-gray-700 hover:text-[#2563EB] transition-colors"
          >
            Home
          </Link>
          <Link
            href="/how-it-works"
            className="text-gray-700 hover:text-[#2563EB] transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="/subscription"
            className="text-gray-700 hover:text-[#2563EB] transition-colors"
          >
            Subscription Plan
          </Link>
          <Link
            href="/affiliate"
            className="text-gray-700 hover:text-[#2563EB] transition-colors"
          >
            Affiliate Program
          </Link>
          <Link
            href="/faq"
            className="text-gray-700 hover:text-[#2563EB] transition-colors"
          >
            FAQ
          </Link>
          <Link
            href="/contact"
            className="text-gray-700 hover:text-[#2563EB] transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop Auth Buttons */}
        <div className="desktop_btn">
          <Link
            href="/signup"
            className="text-gray-700 hover:text-[#2563EB] transition-colors"
          >
            Sign Up
          </Link>
          <Link href="/login" className="login">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile_btn"
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
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/how-it-works"
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/subscription"
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscription Plan
            </Link>
            <Link
              href="/affiliate"
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Affiliate Program
            </Link>
            <Link
              href="/faq"
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-[#2563EB] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="auth_div">
              <Link
                href="/signin"
                className="text-gray-700 hover:text-[#2563EB] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
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

export default Header;
