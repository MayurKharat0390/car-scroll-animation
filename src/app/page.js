'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '58%', label: 'Increase in pick up use', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  { value: '27%', label: 'Increase in engagement', color: 'bg-zinc-800/40 text-white border-zinc-700' },
  { value: '23%', label: 'Decrease in phone calls', color: 'bg-sky-500/10 text-sky-400 border-sky-500/30' },
  { value: '40%', label: 'Growth in digital adoption', color: 'bg-orange-500/10 text-orange-400 border-orange-500/30' },
];

export default function Home() {
  const triggerRef = useRef(null);
  const carRef = useRef(null);
  const revealRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    // Initial Load Animation
    const ctx = gsap.context(() => {
      // Intro animations
      gsap.from('.item-reveal', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Ambient car float (subtle vibration)
      gsap.to('.car-image', {
        y: -10,
        x: -2,
        rotation: 0.8,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Animated Particles (Optimized)
      gsap.to('.particle', {
        y: 'random(-30, 30)',
        x: 'random(-30, 30)',
        opacity: 'random(0.3, 0.7)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.2, // increased stagger, fewer elements
      });

      // Scroll-driven timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: '+=3500', // extended scroll distance for smoother experience
          scrub: 1.5, // much smoother scrub
          pin: true,
          anticipatePin: 1,
        },
      });

      const moveDistance = () => window.innerWidth + 500;

      // Car movement & Text reveal
      scrollTl.to(carRef.current, {
        x: moveDistance,
        ease: 'none',
      }, 0);

      scrollTl.to(revealRef.current, {
        width: moveDistance,
        ease: 'none',
      }, 0);

      // Separate trigger to hide indicator when user scrolls even a little
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start: 'top top',
        end: '+=3500',
        onUpdate: (self) => {
          if (self.progress > 0.01) {
            gsap.to(scrollIndicatorRef.current, { opacity: 0, y: -20, duration: 0.3, overwrite: true });
          } else {
            gsap.to(scrollIndicatorRef.current, { opacity: 1, y: 0, duration: 0.3, overwrite: true });
          }
        }
      });

      // Stat cards appearance
      statsRef.current.forEach((stat, i) => {
        if (stat) {
          scrollTl.fromTo(stat,
            { opacity: 0, scale: 0.5, y: 100, rotation: i % 2 === 0 ? -15 : 15 },
            { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.7)' },
            0.1 + (i * 0.15)
          );
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main suppressHydrationWarning className="bg-[#050505] text-white selection:bg-emerald-500 selection:text-neutral-950 font-outfit overflow-x-hidden">

      {/* Sticky Hero Section */}
      <section ref={triggerRef} className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505] perspective-1000">

        {/* Static Abstract Particles for better performance & no hydration errors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
          {/* Hardcoded positions to avoid Math.random() SSR mismatch */}
          <div className="particle absolute rounded-full bg-emerald-500/20 blur-2xl mix-blend-screen w-[120px] h-[120px] top-[10%] left-[20%] will-change-transform" />
          <div className="particle absolute rounded-full bg-emerald-500/20 blur-2xl mix-blend-screen w-[200px] h-[200px] top-[50%] left-[80%] will-change-transform" />
          <div className="particle absolute rounded-full bg-emerald-500/20 blur-2xl mix-blend-screen w-[150px] h-[150px] top-[80%] left-[10%] will-change-transform" />
          <div className="particle absolute rounded-full bg-emerald-500/20 blur-2xl mix-blend-screen w-[80px] h-[80px] top-[30%] left-[60%] will-change-transform" />
          <div className="particle absolute rounded-full bg-emerald-500/20 blur-2xl mix-blend-screen w-[250px] h-[250px] top-[70%] left-[50%] will-change-transform" />
          <div className="particle absolute rounded-full bg-emerald-500/20 blur-2xl mix-blend-screen w-[180px] h-[180px] top-[40%] left-[15%] will-change-transform" />
        </div>

        {/* Track Area */}
        <div className="absolute inset-x-0 h-[22vh] lg:h-[28vh] bg-[#080808] border-y border-zinc-800/40 flex items-center justify-center pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] z-0">
          {/* Background Text */}
          <h1 className="text-[9vw] sm:text-[8vw] lg:text-[7.5vw] font-black tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.4em] text-zinc-800/80 uppercase item-reveal whitespace-nowrap drop-shadow-2xl translate-x-[0.2em]">
            WELCOME ITZFIZZ
          </h1>
        </div>

        {/* Masked Reveal Area */}
        <div
          ref={revealRef}
          className="absolute inset-x-0 h-[22vh] lg:h-[28vh] bg-emerald-500 overflow-hidden flex items-center z-10 w-0 border-y border-emerald-400 shadow-[0_0_80px_rgba(16,185,129,0.3)]"
        >
          <div className="w-screen flex items-center justify-center absolute inset-y-0 left-0">
            <h1 className="text-[9vw] sm:text-[8vw] lg:text-[7.5vw] font-black tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.4em] text-neutral-950 uppercase shrink-0 whitespace-nowrap translate-x-[0.2em]">
              WELCOME ITZFIZZ
            </h1>
          </div>
        </div>

        {/* Car Component */}
        <div
          ref={carRef}
          className="absolute z-20 pointer-events-none flex items-center justify-center"
          style={{ width: '400px', left: '-400px' }}
        >
          {/* Subtle headlight glow */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 w-32 h-64 bg-emerald-500/20 blur-[60px] rounded-full mix-blend-screen scale-150"></div>

          <Image
            src="/images/car_v5.png"
            alt="Orange Supercar"
            width={400}
            height={200}
            className="car-image object-contain drop-shadow-[25px_30px_30px_rgba(0,0,0,0.95)] z-10"
            priority
          />
        </div>

        {/* Statistics Cards */}
        <div className="absolute inset-0 z-30 pointer-events-none max-w-7xl mx-auto w-full grid grid-cols-2 grid-rows-2 gap-x-[15vw] md:gap-x-[35vw] gap-y-[45vh] lg:gap-y-[55vh] p-6 lg:p-20 place-items-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              ref={el => statsRef.current[i] = el}
              className={`group relative p-6 md:p-8 rounded-3xl ${stat.color} backdrop-blur-xl flex flex-col justify-center w-full max-w-[260px] pointer-events-auto border transition-all duration-500 hover:scale-[1.08] hover:bg-opacity-20 cursor-default will-change-transform`}
            >
              {/* Card micro-glow overlay */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>

              <span className="text-4xl lg:text-5xl font-black mb-1 lg:mb-3 tracking-tighter drop-shadow-md z-10 relative">{stat.value}</span>
              <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest opacity-90 leading-relaxed z-10 relative">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 item-reveal"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">Start Engine</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1.5 backdrop-blur-sm">
            <div className="w-1.5 h-2 bg-emerald-500 rounded-full animate-bounce shadow-[0_0_10px_#10b981]"></div>
          </div>
        </div>

      </section>

      {/* Content Spacer */}
      <div className="h-[250vh] bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]" />

      {/* Final Section */}
      <section className="min-h-screen flex flex-center flex-col items-center justify-center bg-[#050505] px-6 border-t border-zinc-900/50 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md">
            The Future is Here
          </div>
          <h3 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter max-w-5xl leading-[0.9] drop-shadow-2xl">
            Elevating Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 italic">Digital</span> Presence.
          </h3>
          <p className="mt-8 text-zinc-400 max-w-2xl text-lg lg:text-xl font-medium">
            Experience the junction of high-performance design and scalable engineering to outpace the competition.
          </p>
          <button className="mt-12 group relative bg-emerald-500 text-neutral-950 font-black px-12 py-5 rounded-full hover:bg-white transition-all duration-500 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.3)] overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              START THE JOURNEY
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </span>
          </button>
        </div>
      </section>

    </main>
  );
}
