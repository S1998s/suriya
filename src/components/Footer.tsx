"use client";
import { professionalName } from "@/lib/siteInfo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-bg border-t border-dark-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-dark-muted">
        <p>© {currentYear} {professionalName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
