"use client";

import { navigationLinks, legalLinks } from "@/constants";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Facebook",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Twitter",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.346-1.24-.898-.75-1.297-1.587-1.297-2.435V7.462c0-.848.399-1.685 1.297-2.435.898-.75 2.049-1.24 3.346-1.24h7.086c1.297 0 2.448.49 3.346 1.24.898.75 1.297 1.587 1.297 2.435v5.851c0 .848-.399 1.685-1.297 2.435-.898.75-2.049 1.24-3.346 1.24H8.449zm3.568-9.047c-1.604 0-2.907 1.318-2.907 2.942 0 1.624 1.303 2.942 2.907 2.942s2.907-1.318 2.907-2.942c0-1.624-1.303-2.942-2.907-2.942zm4.168-1.394c-.414 0-.75.336-.75.75s.336.75.75.75.75-.336.75-.75-.336-.75-.75-.75z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      className={`bg-[#2563EB] text-white py-8 md:py-12 ${className}`}
      style={{
        background: "linear-gradient(180deg, #2563EB 0%, #0E3488 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="text-center">
          {/* Logo/Brand */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              SUPER SHOPPER
            </h2>
            <p className="text-white/90 text-sm md:text-base">Quick Links</p>
          </div>

          {/* Navigation Links */}
          <nav className="mb-8 w-full">
            <div className="flex flex-wrap mx-auto justify-center  items-center gap-4 md:gap-8 text-sm md:text-base">
              {navigationLinks.map((link, index) => (
                <div key={index}>
                  <a
                    href={link.href}
                    className="text-white/90 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </nav>

          {/* Social Media Links */}
          <div className="mb-8">
            <div className="flex justify-center items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/20 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-white/80">
                © {currentYear} Super Shopper. All Rights Reserved.
              </p>
              <div className="flex flex-wrap justify-center md:justify-end mx-auto items-center gap-4 md:gap-6">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors duration-200 hover:underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
