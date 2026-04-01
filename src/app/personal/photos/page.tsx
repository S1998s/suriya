"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import OptimizedImage from "@/components/OptimizedImage";
import PersonalNavMotion from "@/components/personal/PersonalNavMotion";
import { Reveal, ScrollProgressBar } from "@/components/personal/personal-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const imagePath = (src: string) => `${basePath}${src}`;

const photos = [
  { id: 1, title: "Personal Moment 1", category: "family", image: imagePath("/images/personal/childhood-1.jpeg"), date: "2025", description: "A beautiful personal moment" },
  { id: 2, title: "Personal Moment 2", category: "portraits", image: imagePath("/images/personal/portraits-1.jpeg"), date: "2026", description: "Portrait memory captured" },
  { id: 3, title: "Personal Moment 3", category: "portraits", image: imagePath("/images/personal/portraits-3.jpeg"), date: "2025", description: "Urban exploration" },
  { id: 4, title: "Cricket Action 1", category: "childhood", image: imagePath("/images/personal/childhood-2.jpeg"), date: "2026", description: "Cricket playing moment" },
  { id: 5, title: "Sports Moment", category: "candid", image: imagePath("/images/personal/candid-1.jpeg"), date: "2025", description: "Sports activity capture" },
  { id: 6, title: "Family Moment 1", category: "sports", image: imagePath("/images/personal/sports-1.jpeg"), date: "2025", description: "Family gathering" },
  { id: 7, title: "Family Moment 2", category: "sports", image: imagePath("/images/personal/sports-2.jpeg"), date: "2025", description: "Family celebration" },
  { id: 8, title: "Family Moment 3", category: "sports", image: imagePath("/images/personal/sports-3.jpeg"), date: "2025", description: "Family memories" },
  { id: 9, title: "Personal Moment 4", category: "transformation", image: imagePath("/images/personal/transformation-before-1.jpeg"), date: "2023", description: "Nature moment" },
  { id: 11, title: "Personal Moment 7", category: "family", image: imagePath("/images/personal/family-1.jpeg"), date: "2024", description: "Nature exploration" },
  { id: 12, title: "Special Photo", category: "portraits", image: imagePath("/images/personal/portraits-4.jpeg"), date: "2025", description: "Special moment captured" },
  { id: 13, title: "Special Photo", category: "transformation", image: imagePath("/images/personal/transformation-after-1.jpg"), date: "2025", description: "Special moment captured" },
  { id: 14, title: "Special Photo", category: "candid", image: imagePath("/images/personal/candid-2.jpg"), date: "2025", description: "Special moment captured" },
  { id: 15, title: "Special Photo", category: "transformation", image: imagePath("/images/personal/transformation-after-2.jpg"), date: "2025", description: "Special moment captured" },
  { id: 16, title: "Special Photo", category: "transformation", image: imagePath("/images/personal/transformation-after-3.jpg"), date: "2025", description: "Special moment captured" },
  { id: 17, title: "Special Photo", category: "portraits", image: imagePath("/images/personal/portraits-2.png"), date: "2025", description: "Special moment captured" },
];

export default function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const photoCount = photos.length;
  const collectionCount = new Set(photos.map((photo) => photo.category.toLowerCase())).size;
  const years = photos
    .map((photo) => Number(photo.date))
    .filter((year) => Number.isFinite(year));
  const hasChildhoodMoments = photos.some((photo) => photo.category.toLowerCase() === "childhood");
  const latestYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear();
  const capturedRange =
    years.length > 0 ? `${Math.min(...years)}-${Math.max(...years)}` : `${new Date().getFullYear()}`;
  const timelineValue = hasChildhoodMoments ? "Lifelong" : capturedRange;
  const timelineHelper = hasChildhoodMoments ? `Through ${latestYear}` : "Timeline covered";

  const close = useCallback(() => setSelectedPhoto(null), []);

  useEffect(() => {
    if (selectedPhoto === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedPhoto]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-900 via-purple-900 to-cyan-900">
      <ScrollProgressBar />
      <PersonalNavMotion
        brandLabel="📷 Captured Moments 📷"
        brandHref="/personal"
        active="photos"
        backHref="/personal"
        backLabel="← Personal home"
      />

      <main>
        <section className="px-4 pb-6 pt-12 text-center sm:px-6 sm:pb-8 sm:pt-16 lg:px-8">
          <Reveal from="up">
            <h1 className="text-4xl font-black text-lime-300 drop-shadow-lg sm:text-5xl md:text-6xl">
              Moments in Focus 📸
            </h1>
            <p className="mt-4 text-base font-bold text-white drop-shadow-md sm:text-xl">
              {photoCount} photos from different seasons of life, all in one place. Tap any frame to open it big.
            </p>
          </Reveal>
        </section>

        <AnimatePresence>
          {selectedPhoto !== null && (
            <motion.div
              key="lightbox"
              className="fixed inset-0 z-[60] flex items-end justify-center bg-black/90 p-0 sm:items-center sm:p-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lightbox-heading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
            >
              <motion.div
                className="max-h-[100dvh] w-full max-w-4xl overflow-y-auto rounded-t-3xl border-4 border-lime-400 bg-gradient-to-br from-pink-600/50 to-purple-600/50 p-5 shadow-2xl sm:rounded-2xl sm:p-8"
                initial={reduce ? false : { opacity: 0, y: 120, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, y: 80, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-5 overflow-hidden rounded-xl border-2 border-lime-400">
                  <OptimizedImage
                    src={photos[selectedPhoto].image}
                    alt={photos[selectedPhoto].title}
                    width={1280}
                    height={960}
                    className="max-h-[min(55vh,500px)] w-full object-contain sm:max-h-[500px]"
                    priority
                    sizes="(max-width: 640px) 100vw, 80vw"
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={close}
                  className="w-full min-h-12 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 text-base font-black text-black"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  Close &amp; Relive 👀
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <section className="px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {photos.map((photo, idx) => (
                <motion.button
                  key={photo.id}
                  type="button"
                  onClick={() => setSelectedPhoto(idx)}
                  className="group relative aspect-square w-full cursor-pointer overflow-hidden rounded-xl border-4 border-lime-400 bg-gradient-to-br from-purple-600 to-purple-900 text-left shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 sm:rounded-2xl"
                  initial={reduce ? false : { opacity: 0, y: 28, scale: 0.95 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-5% 0px" }}
                  transition={{ delay: reduce ? 0 : (idx % 6) * 0.05, duration: 0.45, ease }}
                  whileHover={reduce ? undefined : { y: -4, borderColor: "rgb(34 211 238)" }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  <OptimizedImage
                    src={photo.image}
                    alt={photo.title}
                    width={640}
                    height={640}
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                    priority={idx < 4}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="absolute right-1.5 top-1.5 text-lg opacity-0 drop-shadow-lg transition-opacity group-hover:opacity-100 sm:right-2 sm:top-2 sm:text-2xl" aria-hidden>
                    🔍
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 bg-gradient-to-r from-purple-800/50 to-pink-800/50 px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {[
                { label: "📸 Total Photos", value: photoCount, helper: "Moments captured" },
                { label: "🎨 Collections", value: collectionCount, helper: "Story categories" },
                { label: "📅 Captured", value: timelineValue, helper: timelineHelper },
                { label: "💭 Vibes", value: "∞", helper: "Memories that last" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="flex min-h-[160px] flex-col items-center justify-center rounded-xl border-4 border-lime-400 bg-gradient-to-br from-pink-600/30 to-purple-600/30 p-4 text-center shadow-lg shadow-purple-500/30 sm:min-h-[190px] sm:p-6"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : idx * 0.08, duration: 0.45, ease }}
                  whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
                >
                  <div
                    className={`max-w-full break-words px-1 text-center font-black text-lime-300 drop-shadow-md ${
                      String(stat.value).length > 4 ? "text-2xl leading-tight sm:text-4xl" : "text-4xl leading-none sm:text-6xl"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <p className="mt-3 text-sm font-black text-white drop-shadow-md sm:text-lg">{stat.label}</p>
                  <p className="mt-1 text-xs font-semibold text-white/85 sm:text-sm">{stat.helper}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.footer
          className="border-t-4 border-lime-400 bg-gradient-to-r from-purple-900 to-pink-900 py-10 shadow-lg shadow-lime-500/30 sm:py-12"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <p className="font-black text-white drop-shadow-md">
              📷 Every photo = One story + Endless memories + A dash of chaos ✨
            </p>
            <Link
              href="/personal/gallery"
              className="mt-4 inline-block font-bold text-lime-300 underline-offset-4 hover:underline"
            >
              Back to gallery
            </Link>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}