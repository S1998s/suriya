"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PersonalNavMotion from "@/components/personal/PersonalNavMotion";
import { Reveal, ScrollProgressBar } from "@/components/personal/personal-motion";

const ease = [0.22, 1, 0.36, 1] as const;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const imagePath = (src: string) => `${basePath}${src}`;

const photos = [
  { id: 1, title: "Personal Moment 1", category: "family", image: imagePath("/images/personal/IMG_0657.JPG.jpeg"), date: "2025", description: "A beautiful personal moment" },
  { id: 2, title: "Personal Moment 2", category: "groom", image: imagePath("/images/personal/IMG_20260102_124714.jpg.jpeg"), date: "2026", description: "groom memory captured" },
  { id: 3, title: "Personal Moment 3", category: "groom", image: imagePath("/images/personal/IMG_6918.JPG.jpeg"), date: "2025", description: "Urban exploration" },
  { id: 4, title: "Cricket Action 1", category: "childhood", image: imagePath("/images/personal/IMG_2645.JPG.jpeg"), date: "2026", description: "Cricket playing moment" },
  { id: 5, title: "Sports Moment", category: "candid", image: imagePath("/images/personal/IMG_3929.JPG.jpeg"), date: "2025", description: "Sports activity capture" },
  { id: 6, title: "Family Moment 1", category: "sports", image: imagePath("/images/personal/35864.jpg.jpeg"), date: "2025", description: "Family gathering" },
  { id: 7, title: "Family Moment 2", category: "sports", image: imagePath("/images/personal/35873.jpg.jpeg"), date: "2025", description: "Family celebration" },
  { id: 8, title: "Family Moment 3", category: "sports", image: imagePath("/images/personal/44252.jpg.jpeg"), date: "2025", description: "Family memories" },
  { id: 9, title: "Personal Moment 4", category: "transformation", image: imagePath("/images/personal/1678018714280.jpg.jpeg"), date: "2023", description: "Nature moment" },
  { id: 10, title: "Personal Moment 5", category: "candid", image: imagePath("/images/personal/IMG_3883.JPG.jpeg"), date: "2024", description: "groom capture" },
  { id: 11, title: "Personal Moment 7", category: "family", image: imagePath("/images/personal/IMG_20260321_214954.jpg.jpeg"), date: "2024", description: "Nature exploration" },
  { id: 12, title: "Special Photo", category: "groom", image: imagePath("/images/personal/IMG_0935%20Copy%20Copy.jpg.jpeg"), date: "2025", description: "Special moment captured" },
  { id: 13, title: "Special Photo", category: "transformation", image: imagePath("/images/personal/IMG_5017.jpg"), date: "2025", description: "Special moment captured" },
  { id: 14, title: "Special Photo", category: "candid", image: imagePath("/images/personal/IMG_6428.jpg"), date: "2025", description: "Special moment captured" },
  { id: 15, title: "Special Photo", category: "transformation", image: imagePath("/images/personal/IMG_5027.jpg"), date: "2025", description: "Special moment captured" },
  { id: 16, title: "Special Photo", category: "transformation", image: imagePath("/images/personal/IMG_5026.jpg"), date: "2025", description: "Special moment captured" },
  { id: 17, title: "Special Photo", category: "groom", image: imagePath("/images/personal/IMG_5426.PNG"), date: "2025", description: "Special moment captured" },
];

export default function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const reduce = useReducedMotion();

  const categoryList = ["all", ...Array.from(new Set(photos.map((photo) => photo.category.toLowerCase())))];

  const filteredPhotos = selectedCategory === "all" ? photos : photos.filter((photo) => photo.category.toLowerCase() === selectedCategory);

  const categoryMeta: Record<string, { title: string; description: string }> = {
    all: { title: "The Full Album 🎬", description: `${filteredPhotos.length} moments of pure chaos & creativity! Tap any pic to see it big 👆` },
    family: { title: "Family Memories ❤️", description: `Warm family portraits and special celebrations (${filteredPhotos.length} photos)` },
    groom: { title: "Groom Journey 💍", description: `Adventure and transformation captures from the groom collection (${filteredPhotos.length} photos)` },
    sports: { title: "Sports Highlights 🏏", description: `Action-packed sports shots and energetic moments (${filteredPhotos.length} photos)` },
    candid: { title: "Candid Flicks 📸", description: `Natural candid shots showing raw emotion and storytelling (${filteredPhotos.length} photos)` },
    transformation: { title: "Transformation Stories 🔄", description: `Before and after moments that document progress (${filteredPhotos.length} photos)` },
    childhood: { title: "Childhood Tales 🌟", description: `Nostalgic childhood memories and early-days fun (${filteredPhotos.length} photos)` },
  };

  const currentMeta = categoryMeta[selectedCategory] || categoryMeta.all;

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
        brandLabel="📷 All My Pics 📷"
        brandHref="/personal"
        active="photos"
        backHref="/personal"
        backLabel="← Personal home"
      />

      <main>
        <section className="px-4 pb-6 pt-12 text-center sm:px-6 sm:pb-8 sm:pt-16 lg:px-8">
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {categoryList.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-black transition-all ${
                  selectedCategory === category
                    ? "bg-lime-400 text-black shadow-lg"
                    : "border border-white/30 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {category === "all" ? "All" : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
          <Reveal from="up">
            <h1 className="text-4xl font-black text-lime-300 drop-shadow-lg sm:text-5xl md:text-6xl">
              {currentMeta.title}
            </h1>
            <p className="mt-4 text-base font-bold text-white drop-shadow-md sm:text-xl">
              {currentMeta.description}
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
                <motion.img
                  src={photos[selectedPhoto].image}
                  alt={photos[selectedPhoto].title}
                  className="mb-5 max-h-[min(55vh,500px)] w-full rounded-xl border-2 border-lime-400 object-contain sm:max-h-[500px]"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />

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
              {filteredPhotos.map((photo, idx) => (
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
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
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
                { label: "📸 Total Photos", value: photos.length },
                { label: "🎨 Collections", value: "6" },
                { label: "📅 Captured", value: "2023-2026" },
                { label: "💭 Vibes", value: "∞" },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  className="rounded-xl border-4 border-lime-400 bg-gradient-to-br from-pink-600/30 to-purple-600/30 p-4 text-center shadow-lg shadow-purple-500/30 sm:p-6"
                  initial={reduce ? false : { opacity: 0, y: 24 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: reduce ? 0 : idx * 0.08, duration: 0.45, ease }}
                  whileHover={reduce ? undefined : { y: -4, scale: 1.02 }}
                >
                  <div className="text-3xl font-black text-lime-300 drop-shadow-md sm:text-5xl">{stat.value}</div>
                  <p className="mt-1 text-xs font-bold text-white drop-shadow-md sm:text-base">{stat.label}</p>
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