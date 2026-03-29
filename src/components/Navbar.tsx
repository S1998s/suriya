"use client";

import { useState } from "react";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [resumeDownloaded, setResumeDownloaded] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-dark-surface/80 backdrop-blur-lg border-b border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <span className="text-2xl font-bold text-blue-400">
            Shanmugavel R.
          </span>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-dark-muted hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Resume + Back Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`${basePath}/Shanmugavel_Resume.pdf`}
              download
              onClick={() => {
                setResumeDownloaded(true);
                localStorage.setItem("resumeDownloaded", "true");
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Resume
            </a>
            <Link
              href="/"
              className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
              onClick={() => {
                setResumeDownloaded(false);
                localStorage.removeItem("resumeDownloaded");
              }}
            >
              Back to Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark-muted hover:text-blue-400"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-dark-muted hover:text-blue-400 hover:bg-dark-border rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`${basePath}/Shanmugavel_Resume.pdf`}
              download
              onClick={() => {
                setResumeDownloaded(true);
                localStorage.setItem("resumeDownloaded", "true");
                setIsOpen(false);
              }}
              className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              Resume
            </a>
            <Link
              href="/"
              className="block px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-700 hover:text-white transition-colors text-center"
              onClick={() => {
                setIsOpen(false);
                setResumeDownloaded(false);
                localStorage.removeItem("resumeDownloaded");
              }}
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
