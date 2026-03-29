"use client";

import { professionalName, tagline, description } from "@/lib/siteInfo";

interface HeroPhrase {
  text: string;
  delay: string;
}

const heroWords: HeroPhrase[] = [
  { text: "Full Stack Developer", delay: "0s" },
  { text: "UI/UX Designer", delay: "0.2s" },
  { text: "Problem Solver", delay: "0.4s" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-8 animate-fadeIn">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4">
            <span className="text-white">Hi, I&apos;m</span>{" "}
            <span className="text-blue-400">{professionalName}</span>
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl text-dark-muted mt-4">
            {tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-dark-muted mb-12 max-w-2xl mx-auto leading-relaxed animate-slideUp">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-slideUp">
          <a
            href="#projects"
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-lg font-semibold hover:bg-blue-400 hover:text-dark-bg transition-all transform hover:scale-105"
          >
            Get In Touch
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center animate-pulse">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
