"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import PersonalNavMotion from "@/components/personal/PersonalNavMotion";
import {
  HeroParallax,
  MotionItem,
  Reveal,
  ScrollProgressBar,
  Stagger,
} from "@/components/personal/personal-motion";
import { personalName, professionalName, contactEmail, contactPhone } from "@/lib/siteInfo";

const ease = [0.22, 1, 0.36, 1] as const;

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.06 } },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.58, ease } },
};

export default function PersonalPage() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-pink-900 via-purple-900 to-cyan-900">
      <ScrollProgressBar />
      <PersonalNavMotion
        brandLabel="🎉 Personal Zone 🎉"
        brandHref="/"
        active="about"
        backHref="/"
        backLabel="← Portfolio home"
      />

      <main>
        <HeroParallax
          className="flex min-h-screen items-center justify-center px-4 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:px-8"
          innerClassName="mx-auto w-full max-w-4xl text-center will-change-transform"
        >
          {reduce ? (
            <div className="w-full">
              <h1 className="text-4xl font-black drop-shadow-lg sm:text-6xl sm:leading-tight lg:text-7xl">
                <span className="text-lime-300">Hey There! 👋</span>
              </h1>
              <p className="mt-4 text-xl font-bold text-white drop-shadow-md sm:text-3xl lg:text-4xl">
                Welcome to the <span className="text-cyan-300">Chaotic</span> Creative Side of{" "}
                <span className="text-pink-300">{personalName}</span>
              </p>
              <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/95 sm:text-xl lg:text-2xl">
                Where coding meets cricket, fitness meets foodie adventures! 🚀🏏🍜
              </p>
              <a
                href="#about"
                className="mt-10 inline-block rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 px-8 py-4 text-base font-black text-black shadow-xl shadow-lime-500/30 sm:text-lg"
              >
                Let&apos;s Explore This Chaos! 🎨 ↓
              </a>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={heroContainer}
              className="w-full"
            >
              <motion.div variants={heroItem}>
                <h1 className="text-4xl font-black drop-shadow-lg sm:text-6xl sm:leading-tight lg:text-7xl">
                  <span className="text-lime-300">Hey There! 👋</span>
                </h1>
              </motion.div>
              <motion.p
                variants={heroItem}
                className="mt-4 text-xl font-bold text-white drop-shadow-md sm:text-3xl lg:text-4xl"
              >
                Welcome to the <span className="text-cyan-300">Chaotic</span> Creative Side of{" "}
                <span className="text-pink-300">Shanmugavel</span>
              </motion.p>
              <motion.p
                variants={heroItem}
                className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/95 sm:text-xl lg:text-2xl"
              >
                Where coding meets cricket, fitness meets foodie adventures! 🚀🏏🍜
              </motion.p>
              <motion.div variants={heroItem} className="mt-10">
                <motion.a
                  href="#about"
                  className="inline-block rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 px-8 py-4 text-base font-black text-black shadow-xl shadow-lime-500/30 sm:text-lg"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  Let&apos;s Explore This Chaos! 🎨 ↓
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </HeroParallax>

        <section
          id="about"
          className="border-t border-white/10 bg-gradient-to-r from-pink-800/50 to-cyan-800/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal from="left">
              <h2 className="text-3xl font-black text-lime-300 drop-shadow-lg sm:text-5xl">
                🎭 The Real Me
              </h2>
              <div className="mt-4 h-2 w-32 rounded-full bg-gradient-to-r from-lime-400 to-cyan-400" />
            </Reveal>

            <div className="mt-12 space-y-10 sm:space-y-12">
              <Reveal from="up" delay={0.05}>
                <motion.div
                  className="rounded-2xl border-4 border-lime-400 bg-gradient-to-br from-pink-600/30 to-purple-600/30 p-6 shadow-lg shadow-pink-500/30 sm:p-8"
                  whileHover={reduce ? undefined : { scale: 1.01, borderColor: "rgb(244 114 182)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <p className="text-base font-bold leading-relaxed text-white drop-shadow-md sm:text-xl">
                    Hey, I&apos;m{" "}
                    <span className="text-2xl text-lime-300">{personalName}</span> — a code
                    ninja 🥷 by day, cricket enthusiast 🏏 by evening, and a fitness junkie 💪 whenever I
                    can squeeze it in! I believe in good vibes, good food, and even better company! ✨
                  </p>
                </motion.div>
              </Reveal>

              <div className="grid gap-8 md:grid-cols-2">
                <Reveal from="left" delay={0.08}>
                  <motion.div
                    className="rounded-2xl border-4 border-cyan-400 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 p-6 shadow-lg shadow-cyan-500/30 sm:p-8"
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <h3 className="text-2xl font-black text-cyan-300 drop-shadow-md sm:text-3xl">
                      🎯 Quick Facts
                    </h3>
                    <div className="mt-4 space-y-3 font-semibold leading-relaxed text-white drop-shadow-md">
                      <p>
                        📅 <span className="text-lime-300">Born:</span> September 15, 1998 (Gemini ♎)
                      </p>
                      <p>
                        📍 <span className="text-lime-300">From:</span> Avarampatti, Rajapalayam (South 🤎)
                      </p>
                      <p>
                        🎓 <span className="text-lime-300">Education:</span> B.E. Computer Science (fancy
                        title? 😉)
                      </p>
                      <p>
                        💼 <span className="text-lime-300">Job:</span> Senior Software Engineer (I write code
                        that sometimes works!)
                      </p>
                      <p className="pt-2">
                        Living my best life with a healthy mix of Netflix binges and gym sessions! 📺💪
                      </p>
                    </div>
                  </motion.div>
                </Reveal>

                <Reveal from="right" delay={0.1}>
                  <motion.div
                    className="rounded-2xl border-4 border-pink-400 bg-gradient-to-br from-pink-600/30 to-red-600/30 p-6 shadow-lg shadow-pink-500/30 sm:p-8"
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    <h3 className="text-2xl font-black text-pink-300 drop-shadow-md sm:text-3xl">
                      😎 Personality Vibes
                    </h3>
                    <p className="mb-4 mt-4 font-semibold leading-relaxed text-white drop-shadow-md">
                      Sweet. Caring. Slightly sarcastic. 100% honest. People say I&apos;m that friend who&apos;ll
                      listen, laugh, AND give real advice!
                    </p>
                    <div className="space-y-2 text-sm sm:text-base">
                      <p className="font-bold text-lime-300">✨ Honest &amp; Goofy</p>
                      <p className="font-bold text-lime-300">✨ Calm in Chaos</p>
                      <p className="font-bold text-lime-300">✨ Supportive Squad Member</p>
                      <p className="font-bold text-lime-300">✨ Family Forever</p>
                    </div>
                  </motion.div>
                </Reveal>
              </div>

              <Reveal from="up">
                <div className="rounded-2xl border-4 border-purple-400 bg-gradient-to-br from-purple-600/30 to-pink-600/30 p-6 shadow-lg shadow-purple-500/30 sm:p-8">
                  <h3 className="text-2xl font-black text-purple-300 drop-shadow-md sm:text-3xl">
                    🎪 The Fun Stuff
                  </h3>
                  <div className="mt-6 grid gap-8 md:grid-cols-2">
                    <div>
                      <p className="mb-4 text-lg font-black text-white drop-shadow-md">
                        When I&apos;m Not Coding:
                      </p>
                      <ul className="space-y-3">
                        {[
                          "📚 Devouring books (anything, really!)",
                          "🏸 Smashing badminton shots",
                          "🏏 Living my cricket dreams",
                          "🚶 Long walks, zero purpose",
                          "💪 Sweating at the gym",
                        ].map((hobby, idx) => (
                          <motion.li
                            key={hobby}
                            initial={reduce ? false : { opacity: 0, x: -16 }}
                            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-5%" }}
                            transition={{ delay: idx * 0.05, duration: 0.4, ease }}
                            className="font-bold text-white drop-shadow-md transition-colors hover:text-lime-300"
                          >
                            {hobby}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-4 text-lg font-black text-white drop-shadow-md">What Excites Me:</p>
                      <ul className="space-y-3">
                        {[
                          "💻 Cool tech stuff",
                          "🔬 Breaking things (and fixing them!)",
                          "📖 Memes about learning",
                          "🌱 Becoming a better version",
                          "🤝 Helping people smile",
                        ].map((interest, idx) => (
                          <motion.li
                            key={interest}
                            initial={reduce ? false : { opacity: 0, x: 16 }}
                            whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-5%" }}
                            transition={{ delay: idx * 0.05, duration: 0.4, ease }}
                            className="font-bold text-white drop-shadow-md transition-colors hover:text-cyan-300"
                          >
                            {interest}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: "❤️ I Love:",
                    border: "border-lime-400",
                    grad: "from-lime-600/40 to-green-600/40",
                    shadow: "shadow-lime-500/30",
                    h: "text-lime-300",
                    items: [
                      "✓ Random conversations",
                      "✓ Good food (any cuisine!)",
                      "✓ Learning weird stuff",
                      "✓ Staying fit & healthy",
                      "✓ Quality family time",
                    ],
                  },
                  {
                    title: "🎯 My Focus:",
                    border: "border-cyan-400",
                    grad: "from-cyan-600/40 to-blue-600/40",
                    shadow: "shadow-cyan-500/30",
                    h: "text-cyan-300",
                    items: [
                      "✓ Health first, always",
                      "✓ Building discipline",
                      "✓ Real relationships",
                      "✓ Never-ending growth",
                      "✓ Work-life harmony",
                    ],
                  },
                  {
                    title: "👨‍👩‍👧‍👦 Family Squad:",
                    border: "border-pink-400",
                    grad: "from-pink-600/40 to-red-600/40",
                    shadow: "shadow-pink-500/30",
                    h: "text-pink-300",
                    items: [
                      "✓ 12 awesome people and you, just vibing ✨",
                      "✓ Unbreakable bonds",
                      "✓ Lots of laughter",
                      "✓ Shared memes & values",
                      "✓ Always there for each other",
                    ],
                  },
                ].map((block, i) => (
                  <Reveal key={block.title} from="up" delay={0.06 * i}>
                    <motion.div
                      className={`rounded-2xl border-4 ${block.border} bg-gradient-to-br ${block.grad} p-6 shadow-lg ${block.shadow}`}
                      whileHover={reduce ? undefined : { y: -6 }}
                      transition={{ type: "spring", stiffness: 280, damping: 20 }}
                    >
                      <h4 className={`text-xl font-black drop-shadow-md sm:text-2xl ${block.h}`}>
                        {block.title}
                      </h4>
                      <ul className="mt-3 space-y-2 font-bold text-white drop-shadow-md">
                        {block.items.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </motion.div>
                  </Reveal>
                ))}
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <Reveal from="left">
                  <div className="rounded-2xl border-4 border-yellow-400 bg-gradient-to-br from-yellow-600/40 to-lime-600/40 p-6 shadow-lg shadow-yellow-500/30 sm:p-8">
                    <h3 className="text-2xl font-black text-yellow-300 drop-shadow-md sm:text-3xl">
                      🏆 My Proudest Moment
                    </h3>
                    <p className="mt-4 font-bold leading-relaxed text-white drop-shadow-md">
                      Lost <span className="text-2xl text-lime-300">18 KG</span> of weight! 💪 This wasn&apos;t
                      just about numbers on a scale — it was about proving to myself that I CAN do hard things.
                      Discipline wins! This is my &quot;I told you I could do it&quot; moment! 🚀
                    </p>
                  </div>
                </Reveal>
                <Reveal from="right">
                  <div className="rounded-2xl border-4 border-red-400 bg-gradient-to-br from-red-600/40 to-pink-600/40 p-6 shadow-lg shadow-red-500/30 sm:p-8">
                    <h3 className="text-2xl font-black text-red-300 drop-shadow-md sm:text-3xl">
                      💔 The Dhoni Moment
                    </h3>
                    <p className="mt-4 font-bold leading-relaxed text-white drop-shadow-md">
                      Dhoni&apos;s run-out in the 2019 World Cup. 😭 As a cricket fanatic, that moment HURTS.
                      But it taught me about resilience, acceptance, and loving the game even when it breaks your
                      heart. That&apos;s some real life lesson stuff right there! 🏏❤️
                    </p>
                  </div>
                </Reveal>
              </div>

              <Reveal from="up">
                <div className="rounded-2xl border-4 border-purple-400 bg-gradient-to-r from-purple-600/40 to-cyan-600/40 p-6 shadow-lg shadow-purple-500/30 sm:p-8">
                  <h3 className="text-2xl font-black text-lime-300 drop-shadow-md sm:text-3xl">
                    🌟 The Big Dream
                  </h3>
                  <p className="mt-4 text-lg font-bold leading-relaxed text-white drop-shadow-md sm:text-xl">
                    Live a whole, meaningful life filled with{" "}
                    <span className="text-cyan-300">happiness, peace, laughter, and togetherness</span>. I want
                    to be that person who leaves a positive mark, builds real connections, and makes life
                    adventures with the right people. Quality over everything! 🎆
                  </p>
                </div>
              </Reveal>

              <Reveal from="up">
                <div className="rounded-2xl border-4 border-pink-400 bg-gradient-to-br from-pink-600/40 to-purple-600/40 p-6 shadow-lg shadow-pink-500/30 sm:p-8">
                  <h3 className="text-2xl font-black text-pink-300 drop-shadow-md sm:text-3xl">💕 My Person</h3>
                  <p className="mb-4 mt-4 font-bold leading-relaxed text-white drop-shadow-md">
                    Looking for someone who&apos;s kind, funny, and real. Someone who gets me, laughs WITH me
                    (not AT me), and believes in building something beautiful together. Here&apos;s what I value:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      "🤝 Honest communication",
                      "💎 Real trust & loyalty",
                      "❤️ Genuine care & support",
                      "👨‍👩‍👧‍👦 Family-first mindset",
                      "😊 Good sense of humor",
                      "🕊️ Inner peace & positivity",
                    ].map((val, idx) => (
                      <motion.div
                        key={val}
                        initial={reduce ? false : { opacity: 0, scale: 0.94 }}
                        whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-8%" }}
                        transition={{ delay: idx * 0.06, type: "spring", stiffness: 320, damping: 22 }}
                        whileHover={reduce ? undefined : { scale: 1.03 }}
                        className="rounded-xl border-2 border-lime-400 bg-white/10 p-4 text-center font-black text-lime-300 drop-shadow-md"
                      >
                        {val}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal from="up">
                <div className="rounded-2xl border-4 border-lime-400 bg-gradient-to-r from-lime-600/40 to-cyan-600/40 p-6 shadow-lg shadow-lime-500/40 sm:p-8">
                  <h3 className="mb-4 bg-gradient-to-r from-lime-300 to-cyan-300 bg-clip-text text-2xl font-black text-transparent drop-shadow-md sm:text-3xl">
                    🎬 The End Note
                  </h3>
                  <p className="text-base font-bold leading-relaxed text-white drop-shadow-md sm:text-lg">
                    Marriage = Adventure + Support + Laughter + Growth. I&apos;m ready to find someone who wants
                    to build a{" "}
                    <span className="text-lime-300">
                      happy, peaceful, and chaotic-in-a-good-way life together
                    </span>
                    . Life is too short for boring stuff. Let&apos;s make magic! ✨💫
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section
          id="projects"
          className="border-t border-white/10 bg-gradient-to-r from-cyan-900 via-purple-900 to-pink-900 px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
        >
          <div className="mx-auto max-w-6xl">
            <Reveal from="left">
              <h2 className="text-3xl font-black text-lime-300 drop-shadow-lg sm:text-5xl">📸 Picture Time!</h2>
              <div className="mt-4 h-2 w-40 rounded-full bg-gradient-to-r from-lime-400 to-pink-400" />
            </Reveal>

            <div className="mb-16 mt-12 grid gap-8 md:grid-cols-2">
              <Reveal from="left" delay={0.05}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border-4 border-lime-400 bg-gradient-to-br from-pink-600 to-purple-600 shadow-lg"
                  whileHover={reduce ? undefined : { y: -8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <motion.div
                    className="flex h-56 items-center justify-center bg-gradient-to-br from-lime-400 to-cyan-400 text-7xl drop-shadow-lg sm:h-64 sm:text-8xl"
                    whileHover={reduce ? undefined : { scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    📸
                  </motion.div>
                  <Link href="/personal/gallery" className="block p-6 sm:p-8">
                    <h3 className="text-2xl font-black text-white drop-shadow-md transition-colors group-hover:text-lime-300 sm:text-3xl">
                      Photo Gallery 🎨
                    </h3>
                    <p className="mb-4 mt-2 font-bold text-white drop-shadow-md">
                      My collections organized by vibes — Childhood, groom, sports, and more!
                    </p>
                    <div className="flex items-center gap-2 text-lg font-black text-lime-300">
                      Explore Collections →
                    </div>
                  </Link>
                </motion.div>
              </Reveal>

              <Reveal from="right" delay={0.08}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl border-4 border-pink-400 bg-gradient-to-br from-cyan-600 to-blue-600 shadow-lg"
                  whileHover={reduce ? undefined : { y: -8 }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  <motion.div
                    className="flex h-56 items-center justify-center bg-gradient-to-br from-pink-400 to-yellow-400 text-7xl drop-shadow-lg sm:h-64 sm:text-8xl"
                    whileHover={reduce ? undefined : { scale: 1.06 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    📷
                  </motion.div>
                  <Link href="/personal/photos" className="block p-6 sm:p-8">
                    <h3 className="text-2xl font-black text-white drop-shadow-md transition-colors group-hover:text-cyan-300 sm:text-3xl">
                      All Photos 👀
                    </h3>
                    <p className="mb-4 mt-2 font-bold text-white drop-shadow-md">
                      The complete mess... I mean, masterpiece of my photography journey!
                    </p>
                    <div className="flex items-center gap-2 text-lg font-black text-cyan-300">
                      See Everything →
                    </div>
                  </Link>
                </motion.div>
              </Reveal>
            </div>

          </div>
        </section>

        <section className="border-t border-white/10 bg-gradient-to-r from-lime-600/50 to-pink-600/50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <Reveal from="up">
              <h2 className="text-3xl font-black text-white drop-shadow-lg sm:text-5xl">
                Let&apos;s Be Friends! 👋
              </h2>
              <div className="mx-auto mt-4 h-2 w-40 rounded-full bg-gradient-to-r from-cyan-400 to-lime-400" />
            </Reveal>

            <Reveal from="up" delay={0.08}>
              <p className="mx-auto mt-8 max-w-2xl text-base font-bold text-white drop-shadow-md sm:text-xl">
                Got feedback about my photos? Want to chat about cricket, fitness, or just vibe? Or maybe you
                want to collaborate? Drop a message! 💌
              </p>
            </Reveal>

            <Stagger className="mt-10 flex flex-col flex-wrap items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <MotionItem className="w-full sm:w-auto">
                <motion.a
                  href="mailto:shanmugavel127@gmail.com"
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-gradient-to-r from-lime-400 to-cyan-400 px-8 py-4 text-center text-base font-black text-black shadow-lg sm:w-auto sm:text-lg"
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  📧 Send Me a Funny Message
                </motion.a>
              </MotionItem>
              <MotionItem className="w-full sm:w-auto">
                <motion.a
                  href="https://www.linkedin.com/in/shanmugavelcf/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full items-center justify-center rounded-full border-4 border-lime-400 px-8 py-4 text-center text-base font-black text-lime-300 shadow-lg sm:w-auto sm:text-lg"
                  whileHover={reduce ? undefined : { scale: 1.04, backgroundColor: "rgba(163, 230, 53, 0.25)" }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  🔗 Connect on LinkedIn
                </motion.a>
              </MotionItem>
              <MotionItem className="w-full sm:w-auto">
                <motion.a
                  href="https://wa.me/918667809442?text=Hi%21%20I%20found%20your%20site%20and%20wanted%20to%20say%20hello."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 w-full items-center justify-center rounded-full bg-[#25D366] px-8 py-4 text-center text-base font-black text-white shadow-lg sm:w-auto sm:text-lg"
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                >
                  💬 Connect on WhatsApp
                </motion.a>
              </MotionItem>
            </Stagger>
          </div>
        </section>

        <motion.footer
          className="border-t-4 border-lime-400 bg-gradient-to-r from-purple-900 to-pink-900 py-12 shadow-lg shadow-lime-500/30"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
            <p className="text-base font-black text-white drop-shadow-md sm:text-lg">
              Made with{" "}
              {reduce ? (
                <span className="inline-block text-2xl text-pink-300">💗</span>
              ) : (
                <motion.span
                  className="inline-block text-2xl text-pink-300"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                >
                  💗
                </motion.span>
              )}{" "}
              by Shanmugavel Suriya
            </p>
            <p className="mt-4 font-bold text-lime-300 drop-shadow-md">
              © {new Date().getFullYear()} — The Chaotic Corner of the Internet 🌈
            </p>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
