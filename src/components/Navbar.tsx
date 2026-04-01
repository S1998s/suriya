"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const resumeVersion = process.env.NEXT_PUBLIC_RESUME_VERSION || "1";
const resumeUrl = `${basePath}/Shanmugavel_Resume.pdf?v=${resumeVersion}`;

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [resumeDownloaded, setResumeDownloaded] = useState(false);
	const [showResumeModal, setShowResumeModal] = useState(false);

	const handleResumeClick = () => {
		setShowResumeModal(true);
	};

	useEffect(() => {
		if (!showResumeModal) return;

		const scrollY = window.scrollY;
		const previousBodyOverflow = document.body.style.overflow;
		const previousBodyPosition = document.body.style.position;
		const previousBodyTop = document.body.style.top;
		const previousBodyWidth = document.body.style.width;
		const previousHtmlOverflow = document.documentElement.style.overflow;

		document.documentElement.style.overflow = "hidden";
		document.body.style.overflow = "hidden";
		document.body.style.position = "fixed";
		document.body.style.top = `-${scrollY}px`;
		document.body.style.width = "100%";

		return () => {
			document.documentElement.style.overflow = previousHtmlOverflow;
			document.body.style.overflow = previousBodyOverflow;
			document.body.style.position = previousBodyPosition;
			document.body.style.top = previousBodyTop;
			document.body.style.width = previousBodyWidth;
			window.scrollTo(0, scrollY);
		};
	}, [showResumeModal]);

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
						<button
							onClick={handleResumeClick}
							className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
						>
							Resume
						</button>
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
						<button
							onClick={() => {
								handleResumeClick();
								setIsOpen(false);
							}}
							className="block w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
						>
							Resume
						</button>
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

			{/* Resume Modal */}
			{showResumeModal && (
				<div className="fixed inset-0 z-50 bg-black/80">
					<div className="bg-dark-surface w-screen h-screen flex flex-col overflow-hidden">
						{/* Header */}
						<div className="flex justify-between items-center p-2 sm:p-3 border-b border-dark-border shrink-0">
							<h2 className="text-xl font-bold text-white">Resume</h2>
							<button
								onClick={() => setShowResumeModal(false)}
								className="text-dark-muted hover:text-white transition-colors"
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
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* PDF Viewer — large screens only */}
						<div className="hidden lg:flex flex-1 min-h-0 overflow-hidden bg-dark-muted/20">
							<iframe
								src={resumeUrl}
								className="w-full h-full border-0"
								title="Resume"
							/>
						</div>

						{/* Mobile/Tablet Fallback */}
						<div className="flex lg:hidden flex-1 flex-col items-center justify-center gap-6 px-8">
							<svg className="w-24 h-24 text-blue-400 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
							</svg>
							<div className="text-center">
								<p className="text-white font-semibold mb-1">Shanmugavel_Resume.pdf</p>
								<p className="text-dark-muted text-sm">PDF preview isn&apos;t supported on mobile browsers.</p>
							</div>
							<div className="flex flex-col w-full gap-3">
								<a
									href={resumeUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
								>
									Open in Browser
								</a>
								<a
									href={resumeUrl}
									download="Shanmugavel_Resume.pdf"
									onClick={() => {
										setResumeDownloaded(true);
										localStorage.setItem("resumeDownloaded", "true");
									}}
									className="w-full px-6 py-3 border border-blue-400 text-blue-400 rounded-lg hover:text-white hover:bg-blue-700 transition-colors text-center font-medium"
								>
									Download
								</a>
							</div>
						</div>

						{/* Footer — large screens only */}
						<div className="hidden lg:flex items-center justify-end gap-3 p-2 sm:p-3 border-t border-dark-border bg-dark-muted/10 shrink-0">
							<button
								onClick={() => setShowResumeModal(false)}
								className="px-4 py-2 border border-dark-border text-dark-muted rounded-lg hover:bg-dark-border transition-colors"
							>
								Close
							</button>
							<a
								href={resumeUrl}
								download="Shanmugavel_Resume.pdf"
								onClick={() => {
									setResumeDownloaded(true);
									localStorage.setItem("resumeDownloaded", "true");
								}}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
							>
								Download
							</a>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
